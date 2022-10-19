using Bogus;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Core.Persistence.Lib.Models.Enums;

namespace Petrologistic.Core.Persistence.Lib.Repositories;

public class DeliveryRequestRepository : IDeliveryRequestRepository
{
  public Task<IEnumerable<DeliveryRequest>> GetAll()
  {
    var fakeDelivery = new Faker<DeliveryRequest>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Source, (f, u) => f.PickRandomWithout(Source.Default))
      .RuleFor(d => d.TargetDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.IsUrgent, (f, u) => f.Random.Bool())
      .RuleFor(d => d.PurchaseOrder, (f, u) => f.Random.AlphaNumeric(9))
      .RuleFor(d => d.Rank, (f, u) => f.Random.Number(1, 5))
      .RuleFor(d => d.Instructions, (f, u) => f.Lorem.Words())
      .RuleFor(d => d.IsCashOnDelivery, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsPrintPriceOnDelivery, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsSignatureRequiredOnDelivery, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsBringDeliveryTicketToOffice, (f, u) => f.Random.Bool())
      .RuleFor(d => d.CultureCode, (f, u) => "En-Ca")
      .RuleFor(d => d.Currency, (f, u) => "CAD")
      .RuleFor(d => d.DeliveryTicketHeaderNotes, (f, u) => f.Lorem.Words())
      .RuleFor(d => d.DeliveryTicketFooterNotes, (f, u) => f.Lorem.Words());

    return Task.FromResult(fakeDelivery.Generate(10).AsEnumerable());
  }

  Task<DeliveryRequest> IDeliveryRequestRepository.GetById(Guid id)
  {
    throw new NotImplementedException();
  }
}
