namespace Chatbox.Model
{
    public class ChatMessage : BaseDataModel
    {
        public string Content { get; set; }
        
        public ExtraFields? Extra { get; set; }

        public List<ChatFileItem>? FileList { get; set; }

        public List<ChatImageItem>? ImageList { get; set; }

        public string? ObservationId { get; set; }

        public string? ParentId { get; set; }

        public object? PluginState { get; set; }

        public string? QuotaId { get; set; }

        public string? RagQuery { get; set; }

        public string? RagQueryId { get; set; }

        public string? RagRawQuery { get; set; }

        public string Role { get; set; }

        public string? SessionId { get; set; }

        public string? ThreadId { get; set; }

        public string? ToolCallId { get; set; }

        public List<ChatToolPayload>? Tools { get; set; }

        public string? TopicId { get; set; }

        public string? TraceId { get; set; }
    }

    public class ChatToolPayload
    {
        public string ApiName { get; set; }
        public string Arguments { get; set; }
        public string Id { get; set; }
        public string Identifier { get; set; }
        public object Type { get; set; }
    }

    public class ChatFileItem
    {
        public string FileType { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Url { get; set; }
    }

    public class ChatImageItem
    {
        public string alt { get; set; }
        public string id { get; set; }
        public string url { get; set; }
    }

    public class ExtraFields : Dictionary<string, object>
    {
        public string? FromModel { get; set; }
        
        public string? FromProvider { get; set; }
    }
}