using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;

namespace Petrologistic.Core.Persistence.Lib.Models;

public class Account : BaseModel
{
  public AccountType AccountType { get; set; }
  public string Name { get; set; } = default!;
  public string PhoneNumber { get; set; } = default!;
  public string EmailAddress { get; set; } = default!;
  public bool IsNotifyOnDispatch { get; set; }
  public bool IsNotifyOnDelivery { get; set; }
  public bool IsNotifyByMedium { get; set; }
  public Address Address { get; set; } = default!;
}
