using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;
using Petrologistic.Features.Boards.Backend.Lib.Interfaces;

namespace Petrologistic.Features.Boards.Backend.Lib.Services
{
  public class TruckService : ITruckService
  {
    private ITruckRepository _truckRepository { get; }
    private IMapper _autoMapperService { get; }

    public TruckService(ITruckRepository truckRepository, IMapper autoMapperService)
    {
      _truckRepository = truckRepository;
      _autoMapperService = autoMapperService;
    }

    public async Task<IEnumerable<TruckDto>> GetAll()
    {
      var trucksDocuments = await _truckRepository.GetAll();

      var trucksDtos = _autoMapperService.Map<IList<TruckDto>>(trucksDocuments);

      return trucksDtos;
    }
  }
}
