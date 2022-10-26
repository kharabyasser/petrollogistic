using Petrologistic.Core.Persistence.Lib.Models.Enums;

namespace Petrologistic.Features.Boards.Backend.Lib.Dtos;

public class DeliveryRequestDto
{
  public Guid Id { get; set; }
  public string[] Tags { get; set; } = default!;
  public string PurchaseOrder { get; set; } = default!;
  public AccountDto ShipToAccount { get; set; } = default!;
  public IList<ContainerDto> DestinationContainers { get; set; } = default!;
  public DateTime CreationDate { get; set; }
  public DateTime TargetDate { get; set; }
  public int Rank { get; set; }
  public DispatchStatus DispatchStatus { get; set; }
  public TruckDto? DispatchedToTruck { get; set; }
  public DateTime DispatchDate { get; set; }
}
