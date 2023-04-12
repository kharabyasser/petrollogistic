using Petrologistic.Core.Persistence.Lib.Models.Location;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class Truck : BaseModel
{
  public string Name { get; set; } = string.Empty;
  public int Number { get; set; }
  public string Description { get; set; }
  public string TrucksLicense { get; set; }
  public string TrailersLicense { get; set; }
  public string Permit { get; set; }
  public string System { get; set; }
  public GeoCoordinates Position { get; set; } = default!;
}
