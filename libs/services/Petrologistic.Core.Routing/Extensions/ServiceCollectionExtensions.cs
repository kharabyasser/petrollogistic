using Microsoft.Extensions.DependencyInjection;
using Petrologistic.Service.Routing.Interfaces;
using Petrologistic.Service.Routing.Services;
using Petrologistic.Services.Routing.Interfaces;
using Petrologistic.Services.Routing.Models;
using Petrologistic.Services.Routing.Services;

namespace Petrologistic.Service.Routing.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddRoutingFeatures(this IServiceCollection services, RoutingConfig routingConfig)
    {
      services.AddSingleton<IRoutingConfig>(routingConfig);

      services.AddSingleton<IGeneratorService, GeneratorService>();
      services.AddSingleton<IVrpResolverService, VrpResolverService>();

      return services;
    }
  }
}
