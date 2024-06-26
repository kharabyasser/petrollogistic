using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Pricing;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class DeliveryRequest : BaseModel
{
  public Source Source { get; set; }
  public DateTime TargetDate { get; set; }
  public bool IsUrgent { get; set; }
  /// <summary>
  /// PO number, generated when a client make a command.
  /// </summary>
  public int PurchaseOrder { get; set; } = default!;
  public Truck? DispatchedToTruck { get; set; }
  public DateTime DispatchDate { get; set; }
  public User? DispatchedBy { get; set; }
  public int Rank { get; set; }
  public string[]? Instructions { get; set; }
  public bool IsCashOnDelivery { get; set; }
  public bool IsPrintPriceOnDelivery { get; set; }
  public bool IsSignatureRequiredOnDelivery { get; set; }
  public bool IsBringDeliveryTicketToOffice { get; set; }
  public string CultureCode { get; set; } = "En-Us";
  public string Currency { get; set; } = "USD";
  public string[]? DeliveryTicketHeaderNotes { get; set; }
  public string[]? DeliveryTicketFooterNotes { get; set; }
  public Account BillToAccount { get; set; } = default!;
  public Account ShipToAccount { get; set; } = default!;
  public DispatchStatus DispatchStatus { get; set; }
  public IList<Container> DestinationContainers { get; set; } = default!;
  public IList<AdditionalFee> AdditionFees { get; set; } = default!;
}
