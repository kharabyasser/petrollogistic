using HotChocolate;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;

namespace Petrologistic.Features.Boards.Backend.Lib;

public class DeliveryRequestQuery
{
  public async Task<IEnumerable<DeliveryRequest>> GetDeliveryRequests([Service] IDeliveryRequestRepository deliveryRequestRepository)
    => await deliveryRequestRepository.GetAll();

  public async Task<DeliveryRequest> GetDeliveryRequestById([Service] IDeliveryRequestRepository deliveryRequestRepository, Guid id)
   => await deliveryRequestRepository.GetById(id);
}
