using Google.OrTools.ConstraintSolver;
using Petrologistic.Service.Routing.Models;

namespace Petrologistic.Service.Routing.Interfaces
{
  public interface IVrpResolverService
  {
    Task<RoutingAssignment?> Solve(RoutingData data, CancellationToken token);
  }
}
