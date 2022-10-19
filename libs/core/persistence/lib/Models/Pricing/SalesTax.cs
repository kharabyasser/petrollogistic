namespace Petrologistic._Core.Persistence.Lib.Models.Pricing;

public class SalesTax
{
  public Guid Id { get; set; }
  public string Description { get; set; } = default!;
  public double Rate { get; set; }
  public DateTime RateUpdateDate { get; set; }
  public double ChangedRate { get; set; }
}
