namespace Petrologistic.Services.Routing.Models
{
  public class Coordinate
  {
    public Coordinate(double longitude, double latitude)
    {
      Longitude = longitude;
      Latitude = latitude;
    }

    public double Longitude { get; set; }
    public double Latitude { get; set; }
  }
}
