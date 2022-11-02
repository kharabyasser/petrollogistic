using AutoMapper;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Features.Boards.Backend.Lib.Dtos;

namespace Petrologistic.Features.Boards.Backend.Lib.Profiles;

public class DeliveryRequestProfile : Profile
{
  public DeliveryRequestProfile()
  {
    CreateMap<DeliveryRequest, DeliveryRequestDto>()
      .ForMember(dest => dest.Tags, opt => opt.MapFrom((src, dest) =>
      {
        var tags = new List<string> { src.Source.ToString() };

        if (src.IsUrgent)
        {
          tags.Add("Urgent");
        }

        return tags;
      }))
      .ForMember(dest => dest.CreationDate, opt => opt.MapFrom((src, dest) => src.CreationDate));
  }
}
