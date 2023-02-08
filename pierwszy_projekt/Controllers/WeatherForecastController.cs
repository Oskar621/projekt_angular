using Microsoft.AspNetCore.Mvc;

namespace pierwszy_projekt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static List<string> Summaries = new List<string>
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Count)]
            })
            .ToArray();
        }
        [Route("getSummaries")]
        [HttpGet]
        public IEnumerable<string> GetSummaries()
        {
            return Summaries;
        }

        [Route("addSummaries")]
        [HttpPost]
        public IActionResult addSummaries([FromBody]Summary summary)
        {
            Summaries.Add(summary.SummaryDesc);

            return Ok();
        }
    }
}