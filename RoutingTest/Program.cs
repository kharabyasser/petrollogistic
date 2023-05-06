// See https://aka.ms/new-console-template for more information
using Petrologistic.Core.Routing.Models;
using Petrologistic.Core.Routing.Services;

var routingConfig = new RoutingConfig("C:\\Repositories\\petrollogistic\\docker\\volumes\\data\\quebec-latest.osm.pbf");

var routingService = new RandomizerService(routingConfig);
var bbox = new Bbox(-73.38, 45.70, -73.97, 45.40);
var randomCoordinates = routingService.RandomCoordinatesSet(bbox, 30);

Console.WriteLine(randomCoordinates);

