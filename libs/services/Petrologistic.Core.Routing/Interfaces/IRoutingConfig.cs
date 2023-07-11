namespace Petrologistic.Services.Routing.Interfaces
{
  public interface IRoutingConfig
  {
    string OsmPbfFilePath { get; set; }
    string DistanceMatrixService { get; set; }
  }
}
