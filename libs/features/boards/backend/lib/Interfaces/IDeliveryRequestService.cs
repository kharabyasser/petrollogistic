using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Interfaces;

public interface IDeliveryRequestService
{
  Task<DeliveryRequestDto> GetById(Guid id);
  Task<IEnumerable<DeliveryRequestDto>> GetAll();
}
