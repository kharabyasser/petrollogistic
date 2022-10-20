namespace Petrologistic.Core.Persistence.Lib.Models.Pricing;

public class UnitTax
{
  public Guid Id { get; set; }
  public string Description { get; set; } = default!;
  public double Amount { get; set; }
  public DateTime AmountUpdateDate { get; set; }
  public double ChangedRate { get; set; }
  public IList<SalesTax> SalesTaxes { get; set; } = default!;
}
