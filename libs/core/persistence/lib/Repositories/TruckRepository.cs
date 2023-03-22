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
        .RuleFor(d => d.Name, (f, u) => f.Random.Words())
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
