using Microsoft.Extensions.DependencyInjection;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;
using Petrologistic.Features.Boards.Backend.Lib.Profiles;
using Petrologistic.Features.Boards.Backend.Lib.Services;

namespace Petrologistic.Features.Boards.Backend.Lib.ConfigurationExtensions;

public static class BoardsConfigurations
{
  public static void AddBoards(this IServiceCollection services)
  {
    services.AddSingleton<IDeliveryRequestService, DeliveryRequestService>();
    services.AddSingleton<ITruckService, TruckService>();

    services.AddAutoMapper(typeof(DeliveryRequestProfile));
  }
}
