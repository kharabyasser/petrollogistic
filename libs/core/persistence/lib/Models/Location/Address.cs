namespace Petrologistic.Core.Persistence.Lib.Models.Location;

public class Address
{
  public string AddressLine1 { get; set; } = default!;
  public string AddressLine2 { get; set; } = default!;
  public string City { get; set; } = default!;
  public string Province { get; set; } = default!;
  public string PostalCode { get; set; } = default!;
  public string Country { get; set; } = default!;
}
