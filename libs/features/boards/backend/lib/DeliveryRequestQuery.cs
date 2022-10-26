using HotChocolate;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;

namespace Petrologistic.Features.Boards.Backend.Lib;

public class DeliveryRequestQuery
{
  public async Task<IEnumerable<DeliveryRequestDto>> GetDeliveryRequests([Service] IDeliveryRequestService deliveryRequestRepository)
    => await deliveryRequestRepository.GetAll();

  public async Task<DeliveryRequestDto> GetDeliveryRequestById([Service] IDeliveryRequestService deliveryRequestRepository, Guid id)
   => await deliveryRequestRepository.GetById(id);
}
