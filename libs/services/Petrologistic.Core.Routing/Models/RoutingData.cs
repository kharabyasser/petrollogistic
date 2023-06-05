using Petrologistic.Services.Routing.Models;

namespace Petrologistic.Service.Routing.Models
{
  /// <summary>
  /// DistanceMatrix will be calculated in service.
  /// </summary>

  /// <summary>
  /// Depot.
  /// </summary>
  /// Depot is the starting point for a vehicule in case no value is provided for it "Start".

  public class RoutingData
  {
    public Job[] Jobs { get; set; } = default!;
    public Reload[] Reloads { get; set; } = default!;
    public Vehicle[] Vehicles { get; set; } = default!;
    public Coordinate Depot { get; set; } = default!;
  }
}

public class Job
{
  public int Id { get; set; }
  public Coordinate Location { get; set; } = default!;
  public long[] Demands { get; set; } = default!;
  public int[]? RequiredSkills { get; set; }
}

/// <summary>
/// Supply is where trucks load their compartments with goods it is assumed that any compartment will be filled 100%
/// at any supply point.
/// </summary>
public class Reload
{
  public int Id { get; set; }
  public Coordinate Location { get; set; } = default!;
}

/// <summary>
/// Start, End and TrackMode.
/// </summary>
/// If no start is provided, depot will be used as starting point.
/// To end the route of a vehicule at it last stop, "End" should be set to "null" and "TrackMode" to "LastVisit".
/// To end the route of a vehicule at the start point, "End" should be set to "null" and "TrackMode" to "RoundTrip".
/// To end the route of a vehicule at a custom point, "End" should bet set and "TrackMode" to "Custom".

/// <summary>
/// Capacity.
/// </summary>
/// Capacity array represents the total compartments of all vehicules, all vehicule need to have the same length
/// of capacity array.
/// If a vehicule doesn't have a certain compartment of speecific good, this one should be set to 0.

/// <summary>
/// Skills.
/// </summary>
/// Skills array represents the total skills of all vehicules, all vehicule need to have the same length
/// of capacity array.
/// If a vehicule doesn't have a certain skill, this one should be set to 0.

public class Vehicle
{
  public int Id { get; set; }
  public long[] Capacity { get; set; } = default!;
  public long[]? InitialLoad { get; set; } = default!;
  public Coordinate? Start { get; set; }
  public Coordinate? End { get; set; }
  public TrackMode TrackMode { get; set; }
  public int[]? Skills { get; set; }
  public long? MaxDrivingDistance { get; set; }
  public long? MaxDrivingTime { get; set; }
  public int? AverageDrivingSpeed { get; set; }
}
