using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Profiles;

public class ContainerProfile : Profile
{
  public ContainerProfile()
  {
    CreateMap<Container, ContainerDto>()
      .ForMember(dest => dest.Latitude, opt => opt.MapFrom((src, dest) => src.Coordinates.Latitude))
      .ForMember(dest => dest.Longtitude, opt => opt.MapFrom((src, dest) => src.Coordinates.Longitude));
    ;
  }
}
