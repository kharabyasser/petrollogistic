using Petrologistic.Core.Persistence.Lib.Configuration;
using Petrologistic.Features.Boards.Backend.Lib;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRepositories();

builder.Services.AddGraphQLServer().AddQueryType<DeliveryRequestQuery>();

builder.Services.AddCors(c =>
{
  c.AddPolicy("Policy", b =>
  {
    b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
  });
});

var app = builder.Build();

app.MapGraphQL();

app.UseCors("Policy");

app.Run();
