using Google.OrTools.ConstraintSolver;
using Google.Protobuf.WellKnownTypes;
using Newtonsoft.Json;
using Petrologistic.Service.Routing.Interfaces;
using Petrologistic.Service.Routing.Models;
using Petrologistic.Services.Routing.Interfaces;
using System.Text;
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;

namespace Petrologistic.Service.Routing.Services
{
  /// <summary>
  /// Indexes structuring.
  /// </summary>
  // Nodes indexes goes like following structure with depot:
  // Depot(0) > Starts > Reloads > Jobs > Ends.
  // Without depot:
  // Starts > Reloads > Jobs > Ends.

  /// <summary>
  /// Setting starting/ending points.
  /// </summary>
  // Endpoint same as last, set the last to node 0 for example and distance from/to x = 0
  // [0, 0, 0, 0], [0, 0, 50, 200], [0, 50, 0, 100], [0, 200, 100, 0]
  // For custom SP/EP just send indexes in starts/ends for each vehicle in the dto.
  // For custom EP do not include index of endpoint in solution printing, setting the slackvar etc.

  /// <summary>
  /// Reload.
  /// </summary>
  // Set the reload(s) locations with - max(capacity) per compartment. For example Truck1 have Comp1 with capacity 20 and Comp2 with 30
  // Truck2 have Comp1 with capacity 10, Comp2 with capacity 40 and Comp3 with capacity 25. the reload will have demands as follow [-20, -40, -25].
  // Add capacity dimension per comparment and set the MaxSlack to compartment capacity.
  // Set dropping penalty of all loading centers to 0(routing.AddDisjunction(new long[] { manager.NodeToIndex(1) }, 0);).
  // Set dropping penalty to all other nodes to high penalty.
  // Set SlackValue of other nodes (excepte depot, SP, EP, and relaods) to 0.
  // Check Python example on https://github.com/google/or-tools/blob/stable/ortools/constraint_solver/samples/cvrp_reload.py
  // Or on Google labs https://colab.research.google.com/github/google/or-tools/blob/main/examples/notebook/constraint_solver/cvrp_reload.ipynb#scrollTo=code
  // Simplified version also available on repository.

  /// <summary>
  /// Start with a cumul.
  /// </summary>
  // Set a demand on the same starting position of the truck.


  // Note: Setting SetGlobalSpanCostCoefficient to 100 or other will make the algo give more importance to the distance dimension comparing to other constraints.
  // Be careful tho to max distance per vehicle as SetGlobalSpanCostCoefficient will make it acheivable more quickly.

  public class VrpResolverService : IVrpResolverService
  {
    private readonly int GLOBAL_SPAN_COST_COEFFICIENT = 100;
    private readonly int BASE_PENALTY = 100_000_000;

    private readonly HttpClient _httpClient;
    private readonly IRoutingConfig _routingConfig;

    public VrpResolverService(IRoutingConfig routingConfig)
    {
      _routingConfig = routingConfig;
      _httpClient = new HttpClient();
    }

    public async Task<RoutingAssignment?> Solve(RoutingData data, CancellationToken token)
    {
      ValidateRoutingData(data);

      int nodes_last_index = 0;
      int num_vehicle = data.Vehicles.Count();

      List<Node> nodes = new();

      var compartments_count = data.Vehicles[0].Capacity.Length;
      long[] emptyDemands = new long[compartments_count];

      for (int i = 0; i < compartments_count; i++)
      {
        emptyDemands[i] = 0;
      }

      // Add Depot node.
      if (data.Depot != null)
      {
        nodes.Add(new Node
        {
          RefId = 0,
          Demands = emptyDemands,
          Location = data.Depot,
          NodeType = NodeType.Depot,
          NodeIndex = nodes_last_index++,
        });
      }

      // Add Start nodes.
      int[]? starts = data.Vehicles.Any(v => v.Start != null) ? new int[num_vehicle] : null;

      for (int i = 0; i < num_vehicle && starts != null; i++)
      {
        var vehicle = data.Vehicles[i];

        if (vehicle.Start != null)
        {
          var startNodeDemands = vehicle.InitialLoad == null ?
            emptyDemands : vehicle.InitialLoad;

          nodes.Add(new Node
          {
            Demands = startNodeDemands,
            Location = vehicle.Start,
            NodeType = NodeType.Start,
            NodeIndex = nodes_last_index
          });

          starts[i] = nodes_last_index++;
        }
      }

      // Add Reloads nodes.
      long[] reloadsDemands = new long[compartments_count];

      for (int i = 0; i < compartments_count; i++)
      {
        reloadsDemands[i] = -data.Vehicles.Max(v => v.Capacity[i]);
      }

      nodes.AddRange(data.Reloads.Select(r => new Node
      {
        RefId = r.Id,
        Demands = reloadsDemands,
        Location = r.Location,
        NodeType = NodeType.Reload,
        NodeIndex = nodes_last_index++
      }));

      // Add Jobs nodes.
      nodes.AddRange(data.Jobs.Select(j => new Node
      {
        RefId = j.Id,
        Demands = j.Demands,
        Location = j.Location,
        NodeType = NodeType.Job,
        NodeIndex = nodes_last_index++
      }));

      // Add End nodes
      int[]? ends = data.Vehicles.Any(v => v.End != null) ? new int[num_vehicle] : null;

      for (int i = 0; i < num_vehicle && ends != null; i++)
      {
        var vehicle = data.Vehicles[i];

        if (vehicle.End == null && vehicle.TrackMode == TrackMode.LastVisit)
        {
          // Create arbitrary node that distance from/to = 0.
          nodes.Add(new Node
          {
            Demands = emptyDemands,
            Location = null,
            NodeType = NodeType.ArbitraryEnd,
            NodeIndex = nodes_last_index++
          });

          ends[i] = nodes.Count - 1;
        }
        else if (vehicle.End != null && vehicle.TrackMode == TrackMode.Custom)
        {
          nodes.Add(new Node
          {
            Demands = emptyDemands,
            Location = vehicle.End,
            NodeType = NodeType.End,
            NodeIndex = nodes_last_index++
          });

          ends[i] = nodes.Count - 1;
        }
        else if (vehicle.End == null && vehicle.TrackMode == TrackMode.RoundTrip)
        {
          ends[i] = starts[i];
        }
      }

      // Calculate distance distance_matrix.
      // 1. Get matrix from ORS.
      // 2. Adjust it.
      // 2.1. Arbitrary nodes from/to = 0.
      long[][] distance_matrix = await
        GetDistanceMatrix(nodes
        .Select(n => new[] { n.Location.Longitude, n.Location.Latitude })
        .ToArray());

      int num_nodes = nodes.Count;
      int depot = 0;
      long[] max_distances = data.Vehicles.Select(v => v.MaxDrivingDistance ?? long.MaxValue).ToArray();

      RoutingIndexManager manager = null;

      // Create Routing Index Manager
      manager = starts != null && ends != null ?
          new RoutingIndexManager(num_nodes, num_vehicle, starts, ends) :
          new RoutingIndexManager(num_nodes, num_vehicle, depot);

      // Create Routing Model.
      RoutingModel routing = new RoutingModel(manager);

      // Create and register a transit callback.
      int transitCallbackIndex = routing.RegisterTransitCallback((long fromIndex, long toIndex) =>
      {
        var fromNode = manager.IndexToNode(fromIndex);
        var toNode = manager.IndexToNode(toIndex);
        return distance_matrix[fromNode][toNode];
      });

      // Define cost of each arc.
      routing.SetArcCostEvaluatorOfAllVehicles(transitCallbackIndex);
      routing.AddDimensionWithVehicleCapacity(transitCallbackIndex,
                            0,
                            max_distances,
                            true,
                            "Distance");

      // Add distance coefficient.
      var distanceDimension = routing.GetDimensionOrDie("Distance");
      distanceDimension.SetGlobalSpanCostCoefficient(GLOBAL_SPAN_COST_COEFFICIENT);

      // Add Capacity constraint per product.
      List<RoutingDimension> capacity_dimensions = new();
      for (int i = 0; i < compartments_count; i++)
      {
        int callback_index = i;

        var demandCallBackIndex = routing.RegisterUnaryTransitCallback((long fromIndex) =>
        {
          var fromNode = manager.IndexToNode(fromIndex);
          return nodes[fromNode].Demands[callback_index];
        });

        var max_slack = data.Vehicles.Max(v => v.Capacity[i]);
        var capacities = data.Vehicles.Select(v => v.Capacity[i]).ToArray();

        routing.AddDimensionWithVehicleCapacity(demandCallBackIndex,
                                      max_slack,
                                      capacities, // vehicle maximum capacities
                                      true, // start cumul to zero
                                      $"capacity_prod_{i}");

        capacity_dimensions.Add(routing.GetDimensionOrDie($"capacity_prod_{i}"));
      }
      // Allow to drop reloading nodes with zero cost.
      var reload_nodes = nodes.Where(n => n.NodeType == NodeType.Reload);

      foreach (var node in reload_nodes)
      {
        routing.AddDisjunction(new long[] { manager.NodeToIndex(node.NodeIndex) }, 0);
      }

      // Allow to drop regular nodes with a cost.
      // https://developers.google.com/optimization/routing/penalties
      // Set skills and nodes visit enforcment.

      var jobNodes = nodes.Where(n => n.NodeType == NodeType.Job);

      foreach (var job in jobNodes)
      {
        // Set skills and/or exlusivity.
        //routing.VehicleVar(manager.NodeToIndex(2)).SetValues(new long[] { -1, 0 });
        //routing.VehicleVar(manager.NodeToIndex(3)).SetValues(new long[] { -1, 1 });

        var index = manager.NodeToIndex(job.NodeIndex);
        capacity_dimensions.ForEach(d => d.SlackVar(index).SetValue(0));

        // TO.DO: Calculate penalty per node.
        routing.AddDisjunction(new long[] { index }, BASE_PENALTY);
      }

      // Setting first solution heuristic.
      RoutingSearchParameters searchParameters =
          operations_research_constraint_solver.DefaultRoutingSearchParameters();
      searchParameters.FirstSolutionStrategy = FirstSolutionStrategy.Types.Value.PathCheapestArc;
      searchParameters.LocalSearchMetaheuristic = LocalSearchMetaheuristic.Types.Value.GuidedLocalSearch;
      searchParameters.TimeLimit = new Duration { Seconds = 3 };

      Assignment solution = routing.SolveWithParameters(searchParameters);

      if (solution != null)
      {
        var vehicleIndexes = data.Vehicles.Select(v => v.Id).ToArray();

        var allNodes = nodes
                      .Where(n => n.NodeType == NodeType.Job ||
                                  n.NodeType == NodeType.Reload ||
                                  n.NodeType == NodeType.Depot)
                      .ToList();

        return GetAssignmentOutput(
          data,
          routing,
          manager,
          solution,
          allNodes,
          vehicleIndexes,
          capacity_dimensions);
      }

      return null;
    }

    private RoutingAssignment GetAssignmentOutput(in RoutingData data,
                              in RoutingModel routing,
                              in RoutingIndexManager manager,
                              in Assignment solution,
                              List<Node> nodes,
                              int[] vehicleIds,
                              List<RoutingDimension> capacity_dimensions)
    {
      var routingAssignment = new RoutingAssignment();

      routingAssignment.Objective = solution.ObjectiveValue();

      long total_distance = 0;
      List<int> droppedOrders = new List<int>();
      List<int> droppedReloads = new List<int>();

      // Dropped jobs.
      var jobIndexes = nodes.Where(n => n.NodeType == NodeType.Job)
                            .Select(n => n.NodeIndex)
                            .ToArray();
      for (int i = 0; i < jobIndexes.Length; i++)
      {
        var job_index = jobIndexes[i];

        var index = manager.NodeToIndex(job_index);

        if (solution.Value(routing.NextVar(index)) == index)
        {
          droppedOrders.Add(job_index);
        }
      }
      routingAssignment.DroppedOrders = droppedOrders.ToArray();

      // Dropped reloads.
      var reloadIndexes = nodes.Where(n => n.NodeType == NodeType.Reload)
                      .Select(n => n.NodeIndex)
                      .ToArray();
      for (int i = 0; i < reloadIndexes.Length; i++)
      {
        var reload_index = reloadIndexes[i];

        var reloadIndex = manager.NodeToIndex(reload_index);

        if (solution.Value(routing.NextVar(reloadIndex)) == reloadIndex)
        {
          droppedReloads.Add(reload_index);
        }
      }
      routingAssignment.DroppedReloads = droppedReloads.ToArray();

      // Vehicle Routes.
      routingAssignment.VehicleRoutes = new List<VehicleRoute>();

      for (int i = 0; i < data.Vehicles.Length; i++)
      {
        var index = routing.Start(i);
        var node_index = 0;
        long route_distance = 0;
        var last_visit = false;
        var order = 0;

        var vehicle_route = new VehicleRoute();
        vehicle_route.VehicleId = vehicleIds[i];

        while (!last_visit)
        {
          last_visit = routing.IsEnd(index);
          node_index = manager.IndexToNode(index);

          var currentNode = nodes.Single(n => n.NodeIndex == node_index);
          var node_id = currentNode != null ? currentNode.RefId!.Value : -1;

          var visit = new Visit();
          visit.NodeId = node_id;
          visit.NodeIndex = node_index;
          visit.Order = order++;

          var loads = new List<long>();

          foreach (var capacityDimension in capacity_dimensions)
          {
            loads.Add(solution.Value(capacityDimension.CumulVar(index)));
          }
          visit.LoadsOnVisit = loads.ToArray();

          var previous_index = index;

          vehicle_route.Visits.Add(visit);

          if (!last_visit)
          {
            index = last_visit ? index : solution.Value(routing.NextVar(index));
            route_distance += routing.GetArcCostForVehicle(previous_index, index, i);
          }
        }

        vehicle_route.TotalRouteDistance = route_distance;
        vehicle_route.TotalRouteLoads = vehicle_route.Visits.Last().LoadsOnVisit;

        total_distance += route_distance;

        routingAssignment.VehicleRoutes.Add(vehicle_route);
      }

      routingAssignment.TotalDistance = total_distance;

      var total_loads = new long[capacity_dimensions.Count];

      for (int i = 0; i < capacity_dimensions.Count; i++)
      {
        total_loads[i] = routingAssignment.VehicleRoutes.Sum(vr => vr.TotalRouteLoads[i]);
      }

      routingAssignment.TotalLoads = total_loads;

      return routingAssignment;
    }

    private void ValidateRoutingData(RoutingData routing)
    {
      if (routing.Jobs.Length == 0)
      {
        throw new ArgumentException("Jobs are required.");
      }

      if (routing.Vehicles.Length == 0)
      {
        throw new ArgumentException("At least 1 vehicule is required.");
      }

      if (routing.Depot == null && routing.Vehicles.Any(vehicle => vehicle.Start == null))
      {
        throw new ArgumentException("Vehicles starting points and depot couldn't not be both null.");
      }

      if (routing.Vehicles.Any(vehicle => (vehicle.End != null && vehicle.TrackMode != TrackMode.Custom) ||
                                          (vehicle.End == null && vehicle.TrackMode == TrackMode.Custom)))
      {
        throw new ArgumentException("Vehicle ending point and tracking mode missmatch.");
      }

      var demandsCount = routing.Jobs.First().Demands.Count();

      if (routing.Jobs.Any(job => job.Demands.Count() != demandsCount) ||
          routing.Vehicles.Any(vehicle => vehicle.Capacity.Count() != demandsCount))
      {
        throw new ArgumentException("Demands and capacities missmatch.");
      }
    }

    private async Task<long[][]> GetDistanceMatrix(double[][] locations)
    {
      long[][] distance_matrix;

      var locations_json = JsonConvert.SerializeObject(new
      {
        locations = locations,
        metrics = new[] { "distance" }
      });

      var locations_data = new StringContent(locations_json, Encoding.UTF8, "application/json");

      var response = await _httpClient.PostAsync(_routingConfig.DistanceMatrixService, locations_data);

      var result_json = await response.Content.ReadAsStringAsync();

      var result = JsonConvert.DeserializeObject<dynamic>(result_json);

      distance_matrix = result.distances.ToObject<long[][]>();

      return distance_matrix;
    }
  }
}
