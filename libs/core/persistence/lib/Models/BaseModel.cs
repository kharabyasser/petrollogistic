using Petrologistic.Core.Persistence.Lib.Models.Enums;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class BaseModel
{
  public Guid Id { get; set; }
  public DateTime CreationDate { get; set; }
  public Guid CreatedBy { get; set; }
  public DateTime UpdateDate { get; set; }
  public Guid UpdateBy { get; set; }
  public Status Status { get; set; }
}
