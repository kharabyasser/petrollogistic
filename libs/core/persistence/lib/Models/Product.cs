namespace Petrologistic.Core.Persistence.Lib.Models;

public class Product : BaseModel
{
  public int Number { get; set; }
  public string Description { get; set; } = default!;
}
