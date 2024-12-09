using System.Text.Json.Serialization;
using Chatbox.Model;

namespace Chatbox;

[JsonSerializable(typeof(Setting[]))]
[JsonSerializable(typeof(MetaData))]
[JsonSerializable(typeof(ChatMessage))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
    
}