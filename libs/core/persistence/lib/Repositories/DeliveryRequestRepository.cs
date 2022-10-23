using Bogus;
using Petrologistic.Core.Persistence.Lib.Interfaces;
using Petrologistic.Core.Persistence.Lib.Models;
using Petrologistic.Core.Persistence.Lib.Models.Enums;
using Petrologistic.Core.Persistence.Lib.Models.Location;
using Petrologistic.Core.Persistence.Lib.Models.Pricing;

namespace Petrologistic.Core.Persistence.Lib.Repositories;

public class DeliveryRequestRepository : IDeliveryRequestRepository
{
  public Task<IEnumerable<DeliveryRequest>> GetAll()
  {
    var fakeAccounts = new Faker<Account>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Name, (f, u) => f.Lorem.Word())
      .RuleFor(d => d.PhoneNumber, (f, u) => f.Phone.PhoneNumber())
      .RuleFor(d => d.EmailAddress, (f, u) => f.Internet.Email())
      .RuleFor(d => d.IsNotifyByMedium, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsNotifyOnDelivery, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsNotifyOnDispatch, (f, u) => f.Random.Bool())
      .RuleSet("BillingAccount", set =>
      {
        set.Rules((f, u) =>
        {
          u.AccountType = AccountType.Billing;
        });
      })
      .RuleSet("ShippingAccount", set =>
      {
        set.Rules((f, u) =>
        {
          u.AccountType = AccountType.Shipping;
        });
      });

    var fakeSalesTaxes = new Faker<SalesTax>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Description, (f, u) => f.Random.Word())
      .RuleFor(d => d.Rate, (f, u) => f.Random.Number())
      .RuleFor(d => d.RateUpdateDate, (f, u) => f.Date.Past())
      .RuleFor(d => d.ChangedRate, (f, u) => f.Random.Number());

    var fakeUnitTaxes = new Faker<UnitTax>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Description, (f, u) => f.Random.Word())
      .RuleFor(d => d.Amount, (f, u) => f.Random.Number())
      .RuleFor(d => d.AmountUpdateDate, (f, u) => f.Date.Past())
      .RuleFor(d => d.ChangedRate, (f, u) => f.Random.Number())
      .RuleFor(d => d.SalesTaxes, (f, u) => fakeSalesTaxes.GenerateBetween(1, 10));

    var fakeUnitPrices = new Faker<UnitPrice>()
      .RuleFor(d => d.IsExcludingUnitTaxes, (f, u) => f.Random.Bool())
      .RuleFor(d => d.IsLocked, (f, u) => f.Random.Bool())
      .RuleFor(d => d.ApplicableDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.SalesTaxes, (f, u) => fakeSalesTaxes.GenerateBetween(1, 10))
      .RuleFor(d => d.UnitTaxes, (f, u) => fakeUnitTaxes.GenerateBetween(1, 10));

    var fakeContainers = new Faker<Container>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Coordinates, (f, u) => new GeoCoordinates
      {
        Longitude = f.Address.Longitude(),
        Latitude = f.Address.Latitude()
      })
      .RuleFor(d => d.Capacity, (f, u) => f.Random.Number())
      .RuleFor(d => d.IdealDeliveryQuantity, (f, u) => f.Random.Number())
      .RuleFor(d => d.UnitOfMeasurment, (f, u) => f.PickRandomWithout(UnitOfMeasurement.Default))
      .RuleFor(d => d.Percentage, (f, u) => f.Random.Number())
      .RuleFor(d => d.PercentageSource, (f, u) => f.Random.Word())
      .RuleFor(d => d.PercentageMeasurementDate, (f, u) => f.Date.Past())
      .RuleFor(d => d.SerialNumber, (f, u) => new Randomizer().Replace("**-******"))
      .RuleFor(d => d.ExpiryDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.AvailableFromDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.AvaialbeUnitDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.IdentificationBarCode, (f, u) => f.Commerce.Ean8())
      .RuleFor(d => d.AlternativeBarCode, (f, u) => f.Commerce.Ean8())
      .RuleFor(d => d.ProductNumber, (f, u) => f.Random.Number())
      .RuleFor(d => d.ProductDescription, (f, u) => f.Random.Word())
      .RuleFor(d => d.RequestedAmount, (f, u) => f.Random.Number())
      .RuleFor(d => d.RequestedAmountUnit, (f, u) => f.PickRandomWithout(UnitOfMeasurement.Default))
      .RuleFor(d => d.UnitPrices, (f, u) => fakeUnitPrices.GenerateBetween(1, 10).ToArray());

    var fakeDeliveries = new Faker<DeliveryRequest>()
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
      .RuleFor(d => d.DeliveryTicketFooterNotes, (f, u) => f.Lorem.Words())
      .RuleFor(d => d.BillToAccount, (f, u) => fakeAccounts.Generate("BillingAccount"))
      .RuleFor(d => d.ShipToAccount, (f, u) => fakeAccounts.Generate("ShippingAccount"))
      .RuleFor(d => d.DestinationContainers, (f, u) => fakeContainers.GenerateBetween(0, 3));

    return Task.FromResult(fakeDeliveries.Generate(20).AsEnumerable());
  }

  Task<DeliveryRequest> IDeliveryRequestRepository.GetById(Guid id)
  {
    throw new NotImplementedException();
  }
}
