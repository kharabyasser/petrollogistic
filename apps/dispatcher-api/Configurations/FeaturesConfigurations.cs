using Petrologistic.Features.Boards.Backend.Lib.ConfigurationExtensions;

namespace Petrologistic.DispatcherApi.Configurations;

public static class FeaturesConfigurations
{
  public static void AddFeatures(this IServiceCollection services)
  {
    services.AddBoards();
  }
}
