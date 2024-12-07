using Microsoft.JSInterop;
using Photino.Blazor;
using Photino.NET;

namespace Chatbox.Window;

public static class WindowContext
{
    private static PhotinoWindow _photinoWindow;

    public static PhotinoBlazorApp UseWindowContext(this PhotinoBlazorApp app)
    {
        _photinoWindow = app.MainWindow;

        return app;
    }

    [JSInvokable]
    public static void SetTitle(string title)
    {
        _photinoWindow.SetTitle(title);
    }
    
    [JSInvokable]
    public static async IAsyncEnumerable<string> GetFilesAsync()
    {
        // 循环四次
        for (int i = 0; i < 4; i++)
        {
            Console.WriteLine($"File {i}");
            yield return $"File {i}";
            await Task.Delay(1000);
        }
        
        
    }
}