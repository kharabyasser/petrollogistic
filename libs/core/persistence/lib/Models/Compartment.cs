namespace Petrologistic.Core.Persistence.Lib.Models;

public class Compartment : BaseModel
{
  public Guid Id { get; set; } = Guid.Empty;
  public int Number { get; set; } = 0;
  public Product Product { get; set; } = default!;
  public double Capacity { get; set; } = 0;
  public double Load { get; set; } = 0;
}
