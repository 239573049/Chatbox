using System.Drawing;
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
    public static void ResizeWindow(int width, int height, bool fromLeft = false, bool fromBottom = false)
    {
        Console.WriteLine($"ResizeWindow: {width}, {height}, {fromLeft}, {fromBottom}");
        // 获取当前窗口位置
        var currentLeft = _photinoWindow.Left;
        var currentTop = _photinoWindow.Top;

        int newLeft = currentLeft;
        int newTop = currentTop;
        if (fromLeft)
        {
            newLeft = currentLeft + (_photinoWindow.Size.Width - width);
        }

        if (fromBottom)
        {
            newTop = currentTop + (_photinoWindow.Size.Height - height);
        }

        // 设置新的窗口大小和位置
        _photinoWindow.SetSize(width, height);
        _photinoWindow.SetLocation(new Point(newLeft, newTop));
    }


    // 新增功能：最小化窗口
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