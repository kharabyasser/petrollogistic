namespace Petrologistic.Features.Boards.Backend.Lib.Dtos
{
  public class TruckDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Number { get; set; }
    public double Latitude { get; set; }
    public double Longtitude { get; set; }
  }
}
