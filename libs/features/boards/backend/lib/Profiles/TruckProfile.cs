using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Profiles;

public class TruckProfile : Profile
{
  public TruckProfile()
  {
    CreateMap<Truck, TruckDto>()
      .ForMember(dest => dest.Latitude, opt => opt.MapFrom((src, dest) => src.Position?.Latitude))
      .ForMember(dest => dest.Longitude, opt => opt.MapFrom((src, dest) => src.Position?.Longitude));
  }
}
