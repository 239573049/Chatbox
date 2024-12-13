using Chatbox.Contract;

namespace ChatFileServer;

public static class WindowApi
{
    public static IEndpointRouteBuilder MapWindowApi(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/window/title", async context =>
        {
            var window = context.RequestServices.GetRequiredService<IWindowContext>();
            var title = context.Request.Query["title"];
            window.SetTitle(title);

            await Task.CompletedTask;
        });

        endpoints.MapPost("/api/window/minimize", async context =>
        {
            var window = context.RequestServices.GetRequiredService<IWindowContext>();
            window.MinimizeWindow();
            await Task.CompletedTask;
        });

        endpoints.MapPost("/api/window/maximize", async context =>
        {
            var window = context.RequestServices.GetRequiredService<IWindowContext>();
            window.MaximizeWindow();
            await Task.CompletedTask;
        });

        endpoints.MapPost("/api/window/restore", async context =>
        {
            var window = context.RequestServices.GetRequiredService<IWindowContext>();
            window.RestoreWindow();
            await Task.CompletedTask;
        });

        return endpoints;
    }
}