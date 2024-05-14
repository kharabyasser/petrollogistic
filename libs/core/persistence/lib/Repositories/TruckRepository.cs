using Bogus;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;
using Petrologistic.Service.Seeder;
using Petrologistic.Services.Routing.Models;
using Petrologistic.Services.Routing.Services;

namespace Petrologistic.Core.Persistence.Lib.Repositories
{
  public class TruckRepository : ITruckRepository
  {
    private IList<GeoCoordinates>? _geoCoordinates;
    private IList<GeoCoordinates>? _coordinatesToPick;

    private IEnumerable<Truck> _inMemoryTrucks;

    public Task<IEnumerable<Truck>> GetAll()
    {
      if (_geoCoordinates == null)
      {
        var routingConfig = new RoutingConfig
        {
          OsmPbfFilePath =
            "C:\\Repositories\\petrollogistic\\docker\\volumes\\data\\quebec-latest.osm.pbf"
        };
        var routingService = new GeneratorService(routingConfig);
        var bbox = new Bbox(-73.38, 45.70, -73.97, 45.40);
        _geoCoordinates = routingService.RandomCoordinatesSet(bbox, 3)?.Select(c => new GeoCoordinates
        {
          Longitude = c.Longitude,
          Latitude = c.Latitude
        }).ToList() ?? new List<GeoCoordinates>();
      }

      _coordinatesToPick = _geoCoordinates.ToList();

      if (_inMemoryTrucks != null)
      {
        return Task.FromResult(_inMemoryTrucks);
      }

      var fakeCompartments = new Faker<Compartment>()
        .RuleFor(c => c.Id, (f, u) => Guid.NewGuid())
        .RuleFor(c => c.Number, (f, u) => f.Random.Number(1, 100))
        .RuleFor(c => c.Capacity, (f, u) => 2000)
        .RuleFor(c => c.Load, (f, u) => f.Random.Number(100, 2000))
        .RuleFor(c => c.Product, (f, u) =>
        {
          var index = f.Random.Number(1, 4);

          return new Product
          {
            Number = PickingLists.Products.Keys.ToArray()[index],
            Name = PickingLists.Products.Values.ToArray()[index],
            Description = ""
          };
        });

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
        .RuleFor(d => d.Compartments, (f, u) => fakeCompartments.GenerateBetween(2, 2))
        .RuleFor(d => d.Position, (f, u) =>
        {
          var coordinate = f.PickRandom(_coordinatesToPick);
          _coordinatesToPick.Remove(coordinate);

          return coordinate;
        });

      _inMemoryTrucks = fakeTruck.Generate(3).AsEnumerable();

      return Task.FromResult(_inMemoryTrucks);
    }
  }
}
