namespace Chatbox.Contract;

public interface IWindowContext
{
    void SetTitle(string title);

    void MinimizeWindow();

    void MaximizeWindow();
    
    void RestoreWindow();
}