using Chatbox.Window;
using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;
using Photino.NET.Server;

namespace Chatbox;

internal class Program
{
#if DEBUG
    private static readonly bool IsDebugMode = true;
#else
    private static readonly bool IsDebugMode = false;
#endif

    private static PhotinoBlazorApp App;

    [STAThread]
    private static void Main(string[] args)
    {
        var appBuilder = PhotinoBlazorAppBuilder.CreateDefault(args);

        PhotinoServer
            .CreateStaticFileServer(args, out string baseUrl)
            .RunAsync();

        string appUrl = IsDebugMode ? "http://localhost:3000" : $"{baseUrl}/index.html";

        appBuilder.Services.AddBlazorWebView();

        App = appBuilder.Build();

        App.MainWindow
            .Center()
            .SetSize(1000, 800)
            .Load(appUrl)
            .SetTitle("人工智能");
        
        App.MainWindow
            .SetIconFile("./logo.ico");

        App.UseWindowContext()
            .UseSettingContext();

        AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
        {
            Console.WriteLine(error.ExceptionObject);
        };

        App.Run();
    }
}