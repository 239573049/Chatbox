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
}