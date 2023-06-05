namespace Petrologistic.Features.Boards.Backend.Lib.Dtos
{
  public class TruckDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Number { get; set; }
    public string Description { get; set; } = string.Empty;
    public string TrucksLicense { get; set; } = string.Empty;
    public string TrailersLicense { get; set; } = string.Empty;
    public string Permit { get; set; } = string.Empty;
    public string System { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
  }
}
