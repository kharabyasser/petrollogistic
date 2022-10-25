namespace Petrologistic.Core.Persistence.Lib.Models;

public class User : BaseModel
{
  public string Firstname { get; set; } = string.Empty;
  public string Lastname { get; set; } = string.Empty;
  public DateOnly Birthday { get; set; }
}
