using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;

namespace Petrologistic.Features.Boards.Backend.Lib.Services;

public class DeliveryRequestService : IDeliveryRequestService
{
  private IDeliveryRequestRepository _deliveryRequestRepository { get; }
  private IMapper _autoMapperService { get; }

  public DeliveryRequestService(IDeliveryRequestRepository deliveryRequestRepository, IMapper autoMapperService)
  {
    _deliveryRequestRepository = deliveryRequestRepository;
    _autoMapperService = autoMapperService;
  }


  public async Task<IEnumerable<DeliveryRequestDto>> GetAll()
  {
    var deliveryRequestsDocuments = await _deliveryRequestRepository.GetAll();

    var deliveryRequestsDtos = _autoMapperService.Map<IList<DeliveryRequestDto>>(deliveryRequestsDocuments);

    return deliveryRequestsDtos;
  }

  public Task<DeliveryRequestDto> GetById(Guid id)
  {
    throw new NotImplementedException();
  }
}
