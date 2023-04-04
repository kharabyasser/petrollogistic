using Bogus;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;

namespace Petrologistic.Core.Persistence.Lib.Repositories
{
  internal class TruckRepository : ITruckRepository
  {
    public Task<IEnumerable<Truck>> GetAll()
    {
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
        .RuleFor(d => d.Position, (f, u) => new GeoCoordinates
        {
          Longitude = f.Address.Longitude(-73.97, -73.38),
          Latitude = f.Address.Latitude(45.40, 45.70)
        });

      var trucks = fakeTruck.Generate(3).AsEnumerable();

      return Task.FromResult(trucks);
    }
  }
}
