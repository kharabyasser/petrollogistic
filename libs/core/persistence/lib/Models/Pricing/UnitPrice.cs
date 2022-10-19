namespace Petrologistic.Core.Persistence.Lib.Models.Pricing;

public class UnitPrice
{
  public bool IsExcludingUnitTaxes { get; set; }
  public bool IsLocked { get; set; }
  public DateTime ApplicableDate { get; set; }
  public UnitTax[] UnitTaxes { get; set; } = default!;
  public SalesTax[] SalesTaxes { get; set; } = default!;
}
