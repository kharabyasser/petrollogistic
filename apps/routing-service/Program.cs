using Petrologistic.Service.Routing.Extensions;
using Petrologistic.Services.Routing.Models;

var builder = WebApplication.CreateBuilder(args);

var env = Environment.GetEnvironmentVariable("RoutingConfig__DistanceMatrixService");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var routingConfig = new RoutingConfig();
builder.Configuration.GetSection(RoutingConfig.ConfigName).Bind(routingConfig);

builder.Services.AddRoutingFeatures(routingConfig);

var app = builder.Build();

app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
