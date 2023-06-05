using Petrologistic.Services.Routing.Interfaces;

namespace Petrologistic.Services.Routing.Models
{
  public class RoutingConfig : IRoutingConfig
  {
    public const string ConfigName = "RoutingConfig";

    public string OsmPbfFilePath { get; set; } = string.Empty;
    public string DistanceMatrixService { get; set; } = string.Empty;
  }
}
