namespace Petrologistic.Service.Seeder;

public static class PickingLists
{
  public static readonly string[] CanadianProvincesAndTerritories =
  {
    "Ontario",
    "Nova Scotia",
    "New Brunswick",
    "Manitoba",
    "British Columbia",
    "Prince Edward Island",
    "Saskatchewan",
    "Alberta",
    "Quebec",
    "Newfoundland and Labrador"
  };

  public static readonly Dictionary<int, string> Products = new Dictionary<int, string>()
  {
    { 1, "Regular Gas"},
    { 2, "Premium Gas"},
    { 3, "Clear Diesel"},
    { 4, "Dyed Diesel"},
    { 5, "Furnace Oil"}
  };
}
