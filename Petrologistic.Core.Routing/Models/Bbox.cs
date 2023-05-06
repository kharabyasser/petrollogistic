namespace Petrologistic.Core.Routing.Models
{
  public class Bbox
  {
    public Bbox(Coordinate northEast, Coordinate southWest)
    {
      NorthEast = northEast;
      SouthWest = southWest;
    }

    public Bbox(double northEastLong, double northEastLat, double southWestLong, double southWestLat)
    {
      NorthEast = new Coordinate(northEastLong, northEastLat);
      SouthWest = new Coordinate(southWestLong, southWestLat);
    }

    public Coordinate NorthEast { get; set; } = default!;
    public Coordinate SouthWest { get; set; } = default!;
  }
}
