using Microsoft.AspNetCore.Mvc;
using Petrologistic.Service.Routing.Interfaces;
using Petrologistic.Service.Routing.Models;
using Petrologistic.Services.Routing.Models;

namespace Petrologistic.Service.Routing.Controlers
{
  [ApiController]
  [Route("[controller]")]
  public class RoutingController : ControllerBase
  {
    private readonly IVrpResolverService _vrpResolverService;
    private readonly IGeneratorService _generatorService;

    public RoutingController(
      IVrpResolverService vrpResolverService,
      IGeneratorService generatorService)
    {
      _vrpResolverService = vrpResolverService;
      _generatorService = generatorService;
    }

    [HttpPost("Solve")]
    public async Task<ActionResult> SolveVrp([FromBody] RoutingData data, CancellationToken token)
    {
      var result = await _vrpResolverService.Solve(data, token);

      return Ok(result);
    }

    [HttpPost("Generate")]
    public ActionResult Generates([FromBody] Bbox boundary, int count, CancellationToken token)
    {
      var result = _generatorService.RandomCoordinatesSet(boundary, count);

      return Ok(result);
    }

    [HttpPost("IsInBoundary")]
    public ActionResult IsInBoundary([FromBody] Bbox boundary, double? Longitude, double? latitude)
    {
      var result = _generatorService.IsNodeInBoundary(boundary, Longitude, latitude);

      return Ok(result);
    }

    [HttpPost("IsInBoundary")]
    public ActionResult Generates(
      double swlong,
      double swlat,
      double nelong,
      double nelat,
      double? Longitude,
      double? latitude)
    {
      var result = _generatorService.IsNodeInBoundary(swlong, swlat, nelong, nelat, Longitude, latitude);

      return Ok(result);
    }
  }
}
