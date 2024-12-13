namespace ChatFileServer;

public static class VersionsApi
{
    public static IEndpointRouteBuilder MapVersionsApi(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/versions",
            async context => { await context.Response.WriteAsJsonAsync(ResultDto.CreateSuccess(Constant.Version)); });

        return endpoints;
    }
}