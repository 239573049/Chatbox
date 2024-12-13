using Chatbox.Contract;
using Photino.NET;

namespace Chatbox.Window;

public class WindowContext : IWindowContext
{
    private static PhotinoWindow _photinoWindow;

    public WindowContext(PhotinoWindow photinoWindow)
    {
        _photinoWindow = photinoWindow;
    }

    public void SetTitle(string title)
    {
        _photinoWindow.SetTitle(title);
    }

    public void MinimizeWindow()
    {
        _photinoWindow.SetMinimized(true);
    }

    public void MaximizeWindow()
    {
        _photinoWindow.SetMaximized(true);
    }

    public void RestoreWindow()
    {
        _photinoWindow.SetResizable(true);
    }
}