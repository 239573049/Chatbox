namespace ChatFileServer;

public class WebServer(WebApplicationBuilder builder)
{
    internal WebApplicationBuilder Builder { get; set; } = builder;

    public IServiceCollection Services => Builder.Services;

    public IConfiguration Configuration => Builder.Configuration;

    public static WebServer CreateBuildServer(string[] args)
    {
        var server = new WebServer(WebApplication.CreateSlimBuilder(args));
        
        server.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
        });

        return server;
    }

    public void Run(Action<WebApplication> appAction)
    {
        var app = Builder.Build();

        appAction(app);

        app.MapWindowApi();

        app.MapVersionsApi();

        Task.Run(async () => { await app.RunAsync(); });
    }
}