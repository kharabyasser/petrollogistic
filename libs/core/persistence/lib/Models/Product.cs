namespace Petrologistic.Core.Persistence.Lib.Models;

public class Product : BaseModel
{
  public int Number { get; set; } = 0;
  public string Name { get; set; }
  public string Description { get; set; } = string.Empty;
}
