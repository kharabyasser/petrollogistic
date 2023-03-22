namespace Petrologistic.Core.Persistence.Lib.Models.Enums;

public enum DispatchStatus
{
  Default = 0,
  Pending = 1, //Orange
  Assigned = 2, //Remove ?
  Dispatched = 3, //Blue
  OnTruck = 4,
  InProgress = 5, //Turquoise
  Delivered = 6, //Green
  Canceled = 8, //Red
}
