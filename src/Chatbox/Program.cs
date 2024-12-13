using Chatbox.Contract;
using Chatbox.Window;
using ChatFileServer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Photino.Blazor;

namespace Chatbox;

internal static class Program
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
        try
        {
            var appBuilder = PhotinoBlazorAppBuilder.CreateDefault(args);
            var builder = WebServer.CreateBuildServer(args);
            var url = string.Empty;

            // 判断51990端口是否被占用
            var port = WebBuild.GetAvailablePort();

            builder.Services.AddSingleton<FileMiddleware>();
            builder.Services.AddSingleton<IWindowContext, WindowContext>();

            // 添加到urls
            builder.Configuration["urls"] = url = $"http://localhost:{port}";

            string appUrl = IsDebugMode ? "http://localhost:3000" : $"{url}/index.html";

            appBuilder.Services.AddBlazorWebView();

            App = appBuilder.Build();

            App.MainWindow
                .Center()
                .SetSize(1000, 800)
                .Load(appUrl)
                .SetTitle("人工智能");

            App.MainWindow
                .SetIconFile("logo.ico");

            AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
            {
                Console.WriteLine(error.ExceptionObject);
            };

            
            builder.Services.AddSingleton(App.MainWindow);
            

            builder.Run((app => { app.UseMiddleware<FileMiddleware>(); }));

            App.Run();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}