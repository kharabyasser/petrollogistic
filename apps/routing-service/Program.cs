using Petrologistic.Service.Routing.Extensions;
using Petrologistic.Services.Routing.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
      var enumConverter = new JsonStringEnumConverter();
      opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var routingConfig = new RoutingConfig();
builder.Configuration.GetSection(RoutingConfig.ConfigName).Bind(routingConfig);

builder.Services.AddRoutingFeatures(routingConfig);

builder.Services.AddCors(c =>
{
  c.AddPolicy("Policy", b =>
  {
    b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
  });
});

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

app.UseCors("Policy");

app.Run();
