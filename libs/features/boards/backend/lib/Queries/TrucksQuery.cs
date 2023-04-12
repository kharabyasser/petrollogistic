using HotChocolate;
using HotChocolate.Types;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;

namespace Petrologistic.Features.Boards.Backend.Lib.Queries
{
  [ExtendObjectType(typeof(Query))]
  public class TrucksQuery
  {
    public async Task<IEnumerable<TruckDto>> GetTrucks([Service] ITruckService truckService)
      => await truckService.GetAll();
  }
}
