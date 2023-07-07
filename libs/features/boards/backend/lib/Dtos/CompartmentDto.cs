namespace Petrologistic.Features.Boards.Backend.Lib.Dtos;

public class CompartmentDto
{
  public Guid Id { get; set; }
  public int Number { get; set; }
  public double Capacity { get; set; }
  public double Load { get; set; }
  public ProductDto Product { get; set; } = default!;
}
