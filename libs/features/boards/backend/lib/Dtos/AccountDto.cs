
using Petrologistic.Core.Persistence.Lib.Models.Location;

namespace Petrologistic.Features.Boards.Backend.Lib.Dtos;

public class AccountDto
{
  public string Name { get; set; } = default!;
  public string AccountNumber { get; set; } = default!;
  public string PhoneNumber { get; set; } = default!;
  public Address Address { get; set; } = default!;
  public double Latitude { get; set; }
  public double Longitude { get; set; }
}
