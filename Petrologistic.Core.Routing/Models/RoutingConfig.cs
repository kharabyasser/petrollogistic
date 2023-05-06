using Petrologistic.Core.Routing.Interfaces;

namespace Petrologistic.Core.Routing.Models
{
  public class RoutingConfig : IRoutingConfig
  {
    public RoutingConfig(string pbfPath)
    {
      OsmPbfFilePath = pbfPath;
    }

    public string OsmPbfFilePath { get; set; } = default!;
  }
}
