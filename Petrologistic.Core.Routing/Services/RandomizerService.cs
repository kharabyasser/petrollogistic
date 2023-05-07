using OsmSharp.Streams;
using Petrologistic.Core.Routing.Interfaces;
using Petrologistic.Core.Routing.Models;

namespace Petrologistic.Core.Routing.Services
{
  public class RandomizerService
  {
    private readonly IRoutingConfig _routingConfig;

    public RandomizerService(IRoutingConfig routingConfig)
    {
      _routingConfig = routingConfig;
    }

    public Coordinate[]? RandomCoordinatesSet(Bbox boundary, int count)
    {
      var result = new Coordinate[count];

      using (var fileStream = new FileInfo(_routingConfig.OsmPbfFilePath).OpenRead())
      {
        var source = new PBFOsmStreamSource(fileStream);

        var sourceWays = source.Where(e => e.Tags.ContainsKey("highway"));
        //sourceWays = sourceWays.FilterNodes(n => IsNodeInBoundary(boundary, n.Longitude, n.Latitude));

        var boundaryWidth = boundary.NorthEast.Longitude - boundary.SouthWest.Longitude;
        var boundaryHeight = boundary.NorthEast.Latitude - boundary.SouthWest.Latitude;

        var subBoundaryWidth = boundaryWidth / 5;
        var subBoundaryHeight = boundaryHeight / 5;

        var minRanLongitude = boundary.SouthWest.Longitude + subBoundaryWidth;
        var maxRanLongitude = boundary.NorthEast.Longitude;
        var minRanLatitude = boundary.SouthWest.Latitude + subBoundaryHeight;
        var maxRanLatitude = boundary.NorthEast.Latitude;

        // To ignore already found nodes.
        var resultHash = new HashSet<long?>();

        var random = new Random();

        for (int foundNodes = 0; foundNodes < count;)
        {
          double randomLongitude = random.NextDouble() * (maxRanLongitude - minRanLongitude) + minRanLongitude;
          double randomLatitude = random.NextDouble() * (maxRanLatitude - minRanLatitude) + minRanLatitude;

          var subBoundaryElements = sourceWays.FilterNodes(n => IsNodeInBoundary(randomLongitude, randomLatitude, randomLongitude + subBoundaryWidth,
            randomLatitude + subBoundaryHeight, n.Longitude, n.Latitude)) as IEnumerable<OsmSharp.OsmGeo>;

          foreach (var randomElement in subBoundaryElements)
          {
            var node = randomElement as OsmSharp.Node;

            if (!resultHash.Contains(node.Id))
            {
              Console.WriteLine(node.Latitude + " " + node.Longitude + " id: " + node.Id + " " + $"{foundNodes}/{count}");

              result[foundNodes++] = new Coordinate((double)node.Longitude!, (double)node.Latitude!);
              resultHash.Add(node.Id);
              break;
            }
            else
            {
              Console.WriteLine("already added: " + node.Latitude + " " + node.Longitude + " " + $"{foundNodes}/{count}");
            }
          }
        }
      }

      return result;
    }

    private bool IsNodeInBoundary(Bbox boundary, double? longitude, double? latitude)
    {
      var isInBound = IsNodeInBoundary(boundary.SouthWest.Longitude, boundary.SouthWest.Latitude,
        boundary.NorthEast.Longitude, boundary.NorthEast.Latitude, longitude, latitude);

      return isInBound;
    }

    private bool IsNodeInBoundary(double swlong, double swlat, double nelong, double nelat, double? longitude, double? latitude)
    {
      var isInBound = swlong < longitude &&
        swlat < latitude &&
        nelong > longitude &&
        nelat > latitude;

      return isInBound;
    }
  }
}
