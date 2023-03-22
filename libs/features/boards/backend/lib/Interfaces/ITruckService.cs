using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Interfaces
{
  public interface ITruckService
  {
    Task<IEnumerable<TruckDto>> GetAll();
  }
}
