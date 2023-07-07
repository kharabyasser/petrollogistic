using Petrologistic.Core.Persistence.Lib.Models.Location;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class Truck : BaseModel
{
  public string Name { get; set; } = string.Empty;
  public int Number { get; set; } = 0;
  public string Description { get; set; } = string.Empty;
  public string TrucksLicense { get; set; } = string.Empty;
  public string TrailersLicense { get; set; } = string.Empty;
  public string Permit { get; set; } = string.Empty;
  public string System { get; set; } = string.Empty;
  public GeoCoordinates Position { get; set; } = default!;
  public ICollection<Compartment> Compartments { get; set; } = default!;
}
