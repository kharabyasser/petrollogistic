using Bogus;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;
using Petrologistic.Core.Routing.Models;
using Petrologistic.Core.Routing.Services;

namespace Petrologistic.Core.Persistence.Lib.Repositories
{
  public class TruckRepository : ITruckRepository
  {
    private IList<GeoCoordinates>? _geoCoordinates;
    private IList<GeoCoordinates>? _coordinatesToPick;

    public Task<IEnumerable<Truck>> GetAll()
    {
      if (_geoCoordinates == null)
      {
        var routingConfig = new RoutingConfig("C:\\Repositories\\petrollogistic\\docker\\volumes\\data\\quebec-latest.osm.pbf");
        var routingService = new RandomizerService(routingConfig);
        var bbox = new Bbox(-73.38, 45.70, -73.97, 45.40);
        _geoCoordinates = routingService.RandomCoordinatesSet(bbox, 3)?.Select(c => new GeoCoordinates
        {
          Longitude = c.Longitude,
          Latitude = c.Latitude
        }).ToList() ?? new List<GeoCoordinates>();
      }

      _coordinatesToPick = _geoCoordinates.ToList();

      var fakeTruck = new Faker<Truck>()
        .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
        .RuleFor(d => d.Status, (f, u) => DocumentStatus.Active)
        .RuleFor(d => d.Name, (f, u) => f.Random.Word())
        .RuleFor(d => d.Number, (f, u) => f.Random.Number(1000, 9999))
        .RuleFor(d => d.Description, (f, u) => f.Random.Words(3))
        .RuleFor(d => d.Permit, (f, u) => f.Random.Hash(20))
        .RuleFor(d => d.TrailersLicense, (f, u) => f.Random.Hash(20))
        .RuleFor(d => d.TrucksLicense, (f, u) => f.Random.Hash(20))
        .RuleFor(d => d.System, (f, u) => f.Random.Word())
        .RuleFor(d => d.Position, (f, u) =>
        {
          var coordinate = f.PickRandom(_coordinatesToPick);
          _coordinatesToPick.Remove(coordinate);

          return coordinate;
        });

      var trucks = fakeTruck.Generate(3).AsEnumerable();

      return Task.FromResult(trucks);
    }
  }
}
