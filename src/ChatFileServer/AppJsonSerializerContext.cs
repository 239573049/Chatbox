using System.Text.Json.Serialization;

namespace ChatFileServer;

[JsonSerializable(typeof(ResultDto))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}