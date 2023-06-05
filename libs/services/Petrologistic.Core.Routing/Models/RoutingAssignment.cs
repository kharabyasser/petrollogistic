namespace Petrologistic.Service.Routing.Models
{
  public class RoutingAssignment
  {
    public List<VehicleRoute> VehicleRoutes { get; set; } = new List<VehicleRoute>();
    public long TotalDistance { get; set; }
    public long[] TotalLoads { get; set; } = new long[0];
    public long Objective { get; set; }
    public int[]? DroppedOrders { get; set; }
    public int[]? DroppedReloads { get; set; }
  }

  public class VehicleRoute
  {
    public int VehicleId { get; set; }
    public List<Visit> Visits { get; set; } = new List<Visit>();
    public long TotalRouteDistance { get; set; }
    public long[] TotalRouteLoads { get; set; } = new long[0];
  }

  public class Visit
  {
    public int Order { get; set; }
    public int NodeIndex { get; set; }
    public int NodeId { get; set; }
    public long[] LoadsOnVisit { get; set; } = new long[0];
  }
}
