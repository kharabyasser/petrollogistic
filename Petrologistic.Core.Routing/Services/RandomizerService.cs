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
      using (var fileStream = new FileInfo(_routingConfig.OsmPbfFilePath).OpenRead())
      {
        var source = new PBFOsmStreamSource(fileStream);

        var sourceWays = source.Where(e => e.Tags.ContainsKey("highway"));
        sourceWays = sourceWays.FilterNodes(n => IsNodeInBoundary(boundary, n.Longitude, n.Latitude));

        var result = new Coordinate[count];
        var foundNodes = 0;
        var resultHash = new HashSet<long?>();

        var random = new Random();

        foreach (var element in sourceWays)
        {
          if (foundNodes == count)
          {
            return result;
          }

          double randomNumber = random.NextDouble();
          if (randomNumber > 0.1)
          {
            continue;
          }

          var node = element as OsmSharp.Node;
          if (!resultHash.Contains(node.Id))
          {
            Console.WriteLine(node.Latitude + " " + node.Longitude + " id: " + node.Id);

            result[foundNodes++] = new Coordinate((double)node.Longitude!, (double)node.Latitude!);
            resultHash.Add(node.Id);
          }
          else
          {
            Console.WriteLine("out of bbox: " + node.Latitude + " " + node.Longitude);
          }
        }
      }

      return null;
    }

    private bool IsNodeInBoundary(Bbox boundary, double? longitude, double? latitude)
    {
      var isInBound = boundary.SouthWest.Longitude < longitude &&
        boundary.SouthWest.Latitude < latitude &&
        boundary.NorthEast.Longitude > longitude &&
        boundary.NorthEast.Latitude > latitude;

      return isInBound;
    }
  }
}
