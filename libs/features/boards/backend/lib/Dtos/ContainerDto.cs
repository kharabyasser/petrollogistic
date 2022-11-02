using Petrologistic.Core.Persistence.Lib.Models.Enums;

namespace Petrologistic.Features.Boards.Backend.Lib.Dtos;

 
public class ContainerDto
{
  public Guid Id { get; set; }
  public int CurrentPercentage { get; set; }
  public ProductDto Product { get; set; } = default!;
  public double RequestedAmount { get; set; }
  public UnitOfMeasurement RequestedAmountUnit { get; set; }
}
