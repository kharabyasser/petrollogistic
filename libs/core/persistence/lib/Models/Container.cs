using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;
using Petrologistic.Core.Persistence.Lib.Models.Pricing;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class Container : BaseModel
{
  public GeoCoordinates Coordinates { get; set; } = default!;
  public bool IsLocationInProperty { get; set; }
  public double Capacity { get; set; }
  public double IdealDeliveryQuantity { get; set; }
  public UnitOfMeasurement UnitOfMeasurment { get; set; }
  public int Percentage { get; set; }
  public string PercentageSource { get; set; } = default!; // TO.DO: is string ??
  public DateTime PercentageMeasurementDate { get; set; }
  public string SerialNumber { get; set; } = default!;
  public DateTime ExpiryDate { get; set; } = default!;
  public DateTime AvailableFromDate { get; set; }
  public DateTime AvaialbeUnitDate { get; set; }
  public string IdentificationBarCode { get; set; } = default!;
  public string AlternativeBarCode { get; set; } = default!;
  public int ProductNumber { get; set; }
  public string ProductDescription { get; set; } = default!;
  public double RequestedAmount { get; set; }
  public UnitOfMeasurement RequestedAmountUnit { get; set; }
  public IList<UnitPrice> UnitPrices { get; set; } = default!;
}
