namespace Chatbox.Model;

public class AgentModel
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Icon { get; set; }
    public List<string> Tags { get; set; }

    public string Model { get; set; }

    public double Temperature { get; set; }

    public int MaxTokens { get; set; }

    public double TopP { get; set; }

    public double FrequencyPenalty { get; set; }

    public double PresencePenalty { get; set; }

    public AgentModel()
    {
        Tags = new List<string>();
    }
}