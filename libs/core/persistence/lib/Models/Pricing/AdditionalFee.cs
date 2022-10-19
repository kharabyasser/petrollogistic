namespace Petrologistic.Core.Persistence.Lib.Models.Pricing;

public class AdditionalFee
{
  public Guid Id { get; set; }
  public string Description { get; set; } = default!;
  public string FeeType { get; set; }
  public double Rate { get; set; }
  public bool IsRateEditable { get; set; }
  public double Amount { get; set; }
  public bool IsAmountEditable { get; set; }
  public SalesTax[] SalesTax { get; set; } = default!;
}
