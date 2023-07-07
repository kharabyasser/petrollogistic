using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Profiles;

public class CompartmentProfile : Profile
{
  public CompartmentProfile()
  {
    CreateMap<Compartment, CompartmentDto>();
  }
}
