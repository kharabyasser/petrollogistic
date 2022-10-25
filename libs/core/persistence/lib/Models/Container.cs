using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;
using Petrologistic.Core.Persistence.Lib.Models.Pricing;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class Container : BaseModel
{
  public GeoCoordinates Coordinates { get; set; } = default!;
  public double Capacity { get; set; }
  public double IdealDeliveryQuantity { get; set; }
  public UnitOfMeasurement UnitOfMeasurment { get; set; }
  public int CurrentPercentage { get; set; }
  public PercentageSource PercentageSource { get; set; }
  public DateTime PercentageMeasurementDateTime { get; set; }
  public string SerialNumber { get; set; } = default!;
  public DateTime ExpiryDate { get; set; } = default!;
  public DateTime AvailableFromDate { get; set; }
  public DateTime AvaialbeUnitDate { get; set; }
  /// <summary>
  /// Ex: barcode.
  /// </summary>
  public string IdentificationTag { get; set; } = default!;
  public string AlternativeTag{ get; set; } = default!;
  public Product Product { get; set; } = default!;
  public double RequestedAmount { get; set; }
  public UnitOfMeasurement RequestedAmountUnit { get; set; }
  public IList<UnitPrice> UnitPrices { get; set; } = default!;
}
