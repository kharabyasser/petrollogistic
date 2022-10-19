using Petrologistic._Core.Persistence.Lib.Models.Enums;

namespace Petrologistic._Core.Persistence.Lib.Models;

public class DeliveryRequest
{
  public Guid Id { get; set; }
  public Source Source { get; set; }
  public DateTime TargetDate { get; set; }
  public bool IsUrgent { get; set; }
  public string PurchaseOrder { get; set; } = default!;
  public Guid DispatchedToTruck { get; set; }
  public DateTime DispatchDate { get; set; }
  public Guid DispatchedBy { get; set; }
  public int Rank { get; set; }
  public string[]? Instructions { get; set; }
  public bool IsCashOnDelivery { get; set; }
  public bool IsPrintPriceOnDelivery { get; set; }
  public bool IsSignatureRequiredOnDelivery { get; set; }
  public bool IsBringDeliveryTicketToOffice { get; set; }
  public string CultureCode { get; set; } = default!; // Add default culture code.
  public string Currency { get; set; } = "CAD";
  public string[]? DeliveryTicketHeaderNotes { get; set; }
  public string[]? DeliveryTicketFooterNotes { get; set; }
  public Guid BillToAccount { get; set; }
  public Guid ShipToAccount { get; set; }
  public Guid[] DestinationContainers { get; set; } = default!;
  public Guid[] AdditionFees { get; set; } = default!;
}
