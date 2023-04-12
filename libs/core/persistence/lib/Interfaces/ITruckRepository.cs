using Petrologistic.Core.Persistence.Lib.Models;

namespace Petrologistic.Core.Persistence.Lib.Interfaces
{
  public interface ITruckRepository
  {
    Task<IEnumerable<Truck>> GetAll();
  }
}
