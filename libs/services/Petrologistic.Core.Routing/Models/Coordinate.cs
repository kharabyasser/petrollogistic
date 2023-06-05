namespace Petrologistic.Services.Routing.Models
{
  public class Coordinate
  {
    public Coordinate(double Longitude, double latitude)
    {
      Longitude = Longitude;
      Latitude = latitude;
    }

    public double Longitude { get; set; }
    public double Latitude { get; set; }
  }
}
