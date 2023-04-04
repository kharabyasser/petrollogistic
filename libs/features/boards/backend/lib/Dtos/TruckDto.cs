namespace Petrologistic.Features.Boards.Backend.Lib.Dtos
{
  public class TruckDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Number { get; set; }
    public string Description { get; set; }
    public string TrucksLicense { get; set; }
    public string TrailersLicense { get; set; }
    public string Permit { get; set; }
    public string System { get; set; }
    public double Latitude { get; set; }
    public double Longtitude { get; set; }
  }
}
