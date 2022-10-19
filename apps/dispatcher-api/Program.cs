using Petrologistic.Core.Persistence.Lib.Configuration;
using Petrologistic.Features.Boards.Backend.Lib;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRepositories();

builder.Services.AddGraphQLServer().AddQueryType<DeliveryRequestQuery>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();
