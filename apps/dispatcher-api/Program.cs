using Petrologistic.Core.Persistence.Lib.Configuration;
using Petrologistic.DispatcherApi.Configurations;
using Petrologistic.Features.Boards.Backend.Lib.Queries;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGraphQLServer()
  .AddQueryType<Query>()
  .AddTypeExtension<DeliveryRequestQuery>()
  .AddTypeExtension<TrucksQuery>();

builder.Services.AddCors(c =>
{
  c.AddPolicy("Policy", b =>
  {
    b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
  });
});

builder.Services.AddRepositories();

builder.Services.AddFeatures();

var app = builder.Build();

app.MapGraphQL();

app.UseCors("Policy");

app.Run();
