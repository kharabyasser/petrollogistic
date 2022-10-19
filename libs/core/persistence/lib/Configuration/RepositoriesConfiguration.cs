using Microsoft.Extensions.DependencyInjection;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Repositories;

namespace Petrologistic.Core.Persistence.Lib.Configuration;

public static class RepositoriesConfiguration
{
  public static IServiceCollection AddRepositories(this IServiceCollection services)
  {
    services.AddSingleton<IDeliveryRequestRepository, DeliveryRequestRepository>();

    return services;
  }
}
