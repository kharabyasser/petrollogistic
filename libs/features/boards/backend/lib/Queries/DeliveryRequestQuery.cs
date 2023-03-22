using HotChocolate;
using HotChocolate.Types;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;

namespace Petrologistic.Features.Boards.Backend.Lib.Queries;

[ExtendObjectType(typeof(Query))]
public class DeliveryRequestQuery
{
  public async Task<IEnumerable<DeliveryRequestDto>> GetDeliveryRequests([Service] IDeliveryRequestService deliveryRequestRepository)
    => await deliveryRequestRepository.GetAll();

  public async Task<DeliveryRequestDto> GetDeliveryRequestById([Service] IDeliveryRequestService deliveryRequestService, Guid id)
   => await deliveryRequestService.GetById(id);
}
