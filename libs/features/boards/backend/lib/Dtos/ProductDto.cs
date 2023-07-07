namespace Petrologistic.Features.Boards.Backend.Lib.Dtos;

public class ProductDto
{
  public int Number { get; set; }
  public string Name { get; set; }
  public string Description { get; set; } = default!;
}
