using Petrologistic.Services.Routing.Models;

namespace Petrologistic.Service.Routing.Interfaces
{
  public interface IGeneratorService
  {
    Coordinate[] RandomCoordinatesSet(Bbox boundary, int count);
    bool IsNodeInBoundary(Bbox boundary, double? Longitude, double? latitude);
    bool IsNodeInBoundary(double swlong, double swlat, double nelong, double nelat, double? Longitude, double? latitude);
  }
}
