using Microsoft.Azure.Functions.Worker;
using Microsoft.CopilotDashboard.DataIngestion.Models;
using Microsoft.CopilotDashboard.DataIngestion.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Microsoft.CopilotDashboard.DataIngestion.Functions;

public class CopilotSeatsIngestion
{
    private readonly ILogger _logger;
    private readonly GitHubCopilotSeatsClient _gitHubCopilotSeatsClient;

    public CopilotSeatsIngestion(GitHubCopilotSeatsClient gitHubCopilotSeatsClient, ILogger<CopilotSeatsIngestion> logger)
    {
        _gitHubCopilotSeatsClient = gitHubCopilotSeatsClient;
        _logger = logger;
    }

    [Function("GitHubCopilotSeatsIngestion")]
    [CosmosDBOutput(databaseName: "platform-engineering", containerName: "seats_history", Connection = "AZURE_COSMOSDB_ENDPOINT", CreateIfNotExists = true)]
    public async Task<IEnumerable<CopilotSeats>> Run([TimerTrigger("0 0 * * * *")] TimerInfo myTimer)
    {
        _logger.LogInformation($"GitHubCopilotSeatsIngestion timer trigger function executed at: {DateTime.Now}");

        var token = Environment.GetEnvironmentVariable("MY_GITHUB_TOKEN")!;
        var scope = Environment.GetEnvironmentVariable("GITHUB_API_SCOPE")!;
        Boolean.TryParse(Environment.GetEnvironmentVariable("ENABLE_SEATS_INGESTION") ?? "true", out var seatsIngestionEnabled);
        if (!seatsIngestionEnabled)
        {
            _logger.LogInformation("Seats ingestion is disabled");
            return Array.Empty<CopilotSeats>();
        }

        IEnumerable<CopilotSeats> seatsPages;

        if (!string.IsNullOrWhiteSpace(scope) && scope == "enterprise")
        {
            var enterprise = Environment.GetEnvironmentVariable("GITHUB_ENTERPRISE")!;
            _logger.LogInformation("Fetching GitHub Copilot seats for enterprise");
            seatsPages = await _gitHubCopilotSeatsClient.GetEnterpriseAssignedSeatsPagesAsync(enterprise, token);
        }
        else
        {
            var organization = Environment.GetEnvironmentVariable("GITHUB_ORGANIZATION")!;
            _logger.LogInformation("Fetching GitHub Copilot seats for organization");
            seatsPages = await _gitHubCopilotSeatsClient.GetOrganizationAssignedSeatsPagesAsync(organization, token);
        }

        if (myTimer.ScheduleStatus is not null)
        {
            _logger.LogInformation($"Finished ingestion. Next timer schedule at: {myTimer.ScheduleStatus.Next}");
        }

        return seatsPages;
    }
}
