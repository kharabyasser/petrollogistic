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
    string[] canadianProvincesAndTerritories = { "Ontario", "Nova Scotia", "New Brunswick", "Manitoba", "British Columbia", "Prince Edward Island", "Saskatchewan",
    "Alberta", "Quebec", "Newfoundland and Labrador"};

    var fakeAddress = new Faker<Address>()
      .RuleFor(d => d.AddressLine1, (f, u) => f.Address.StreetAddress())
      .RuleFor(d => d.AddressLine2, (f, u) => f.Address.StreetName())
      .RuleFor(d => d.City, (f, u) => f.Address.City())
      .RuleFor(d => d.Country, (f, u) => f.Address.Country())
      .RuleFor(d => d.PostalCode, (f, u) => f.Address.ZipCode("?#? #?#"))
      .RuleFor(d => d.Province, (f, u) => f.PickRandom(canadianProvincesAndTerritories));

    Action<Faker, Account> fakeAccountDelegate = (f, u) =>
    {
      u.Id = Guid.NewGuid();
      u.Name = f.Lorem.Word();
      u.AccountNumber = f.Random.Number(999, 9999);
      u.PhoneNumber = f.Phone.PhoneNumber();
      u.EmailAddress = f.Internet.Email();
      u.IsNotifyByMedium = f.Random.Bool();
      u.IsNotifyOnDelivery = f.Random.Bool();
      u.IsNotifyOnDispatch = f.Random.Bool();
      u.Address = fakeAddress.Generate();
      u.Coordinates = new GeoCoordinates
      {
        Longitude = f.Address.Longitude(-73.97, -73.38),
        Latitude = f.Address.Latitude(45.40, 45.70)
      };
    };

    var fakeAccounts = new Faker<Account>()

      .RuleSet("BillingAccount", set =>
      {
        set.Rules((f, u) =>
        {
          u.AccountType = AccountType.Billing;
          fakeAccountDelegate(f, u);
        });
      })
      .RuleSet("ShippingAccount", set =>
      {
        set.Rules((f, u) =>
        {
          u.AccountType = AccountType.Shipping;
          fakeAccountDelegate(f, u);
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
      .RuleFor(d => d.ContainerNumber, (f, u) => f.Random.Number(0, 100))
      .RuleFor(d => d.Capacity, (f, u) => f.Random.Number())
      .RuleFor(d => d.IdealDeliveryQuantity, (f, u) => f.Random.Number())
      .RuleFor(d => d.UnitOfMeasurment, (f, u) => f.PickRandomWithout(UnitOfMeasurement.Default))
      .RuleFor(d => d.CurrentPercentage, (f, u) => f.Random.Number(0, 100))
      .RuleFor(d => d.PercentageSource, (f, u) => f.PickRandomWithout(PercentageSource.Default))
      .RuleFor(d => d.PercentageMeasurementDateTime, (f, u) => f.Date.Past())
      .RuleFor(d => d.SerialNumber, (f, u) => new Randomizer().Replace("**-******"))
      .RuleFor(d => d.ExpiryDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.AvailableFromDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.AvaialbeUnitDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.IdentificationTag, (f, u) => f.Commerce.Ean8())
      .RuleFor(d => d.AlternativeTag, (f, u) => f.Commerce.Ean8())
      .RuleFor(d => d.Product, (f, u) => new Product
      {
        Number = f.Random.Number(10, 50),
        Description = f.Random.Word()
      })
      .RuleFor(d => d.RequestedAmount, (f, u) => f.Random.Number(450, 2250))
      .RuleFor(d => d.RequestedAmountUnit, (f, u) => f.PickRandomWithout(UnitOfMeasurement.Default))
      .RuleFor(d => d.UnitPrices, (f, u) => fakeUnitPrices.GenerateBetween(1, 10).ToArray());

    var fakeDeliveries = new Faker<DeliveryRequest>()
      .RuleFor(d => d.Id, (f, u) => Guid.NewGuid())
      .RuleFor(d => d.Source, (f, u) => f.PickRandomWithout(Source.Default))
      .RuleFor(d => d.TargetDate, (f, u) => f.Date.Future())
      .RuleFor(d => d.IsUrgent, (f, u) => f.Random.Bool())
      .RuleFor(d => d.PurchaseOrder, (f, u) => f.Random.Number(9999, 99999))
      .RuleFor(d => d.CreationDate, (f, u) => f.Date.Past())
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
      .RuleFor(d => d.DispatchStatus, (f, u) => DispatchStatus.Pending)
      .RuleFor(d => d.DestinationContainers, (f, u) => fakeContainers.GenerateBetween(1, 3));

    var deliveryRequests = fakeDeliveries.Generate(100).AsEnumerable();

    return Task.FromResult(deliveryRequests);
  }

  Task<DeliveryRequest> IDeliveryRequestRepository.GetById(Guid id)
  {
    throw new NotImplementedException();
  }
}
