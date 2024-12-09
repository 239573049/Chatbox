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
    public static void MinimizeWindow()
    {
        _photinoWindow.SetMinimized(true);
    }

    // 新增功能：最大化窗口
    [JSInvokable]
    public static void MaximizeWindow()
    {
        _photinoWindow.SetMaximized(true);
    }

    // 新增功能：恢复窗口
    [JSInvokable]
    public static void RestoreWindow()
    {
        _photinoWindow.SetResizable(true);
    }
}