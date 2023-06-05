using Petrologistic.Services.Routing.Models;

public class Node
{
  public int? RefId { get; set; }
  public long[] Demands { get; set; } = default!;
  public Coordinate Location { get; set; } = null!;
  public NodeType NodeType { get; set; }
  public int NodeIndex { get; set; }
}
