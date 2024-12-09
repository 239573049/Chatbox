namespace Chatbox.Model;

public class Setting
{
    public string ApiKey { get; set; }

    public int MaxToken { get; set; }

    /// <summary>
    /// 当前用户的头像
    /// </summary>
    public string Avatar { get; set; }

    /// <summary>
    /// 当前用户的昵称
    /// </summary>
    public string Nickname { get; set; }
}