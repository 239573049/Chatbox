using System.Text.Json;
using Chatbox.Model;
using Microsoft.JSInterop;
using Photino.Blazor;
using Photino.NET;

namespace Chatbox;

public static class SettingContext
{
    private static PhotinoWindow _photinoWindow;

    public static PhotinoBlazorApp UseSettingContext(this PhotinoBlazorApp app)
    {
        _photinoWindow = app.MainWindow;

        return app;
    }

    [JSInvokable]
    public static async Task<Setting> GetSetting()
    {
        var file = new FileInfo(Path.Combine("Configs", "setting.json"));

        if (file.Directory?.Exists == false)
        {
            file.Directory.Create();
        }

        if (!file.Exists)
        {
            var setting = new Setting()
            {
                Avatar = "🐣",
                MaxToken = 2048,
                Nickname = "Token",
                ApiKey = "您在https://api.token-ai.cn/申请的API Key"
            };
            // 提供默认设置
            await File.WriteAllTextAsync(file.FullName,
                JsonSerializer.Serialize(setting, JsonOption.JsonSerializerOptions));

            return setting;
        }

        var json = await File.ReadAllTextAsync(file.FullName);

        return JsonSerializer.Deserialize<Setting>(json, JsonOption.JsonSerializerOptions);
    }

    /// <summary>
    /// 更新配置
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public static async Task SaveSetting(Setting setting)
    {
        var file = new FileInfo(Path.Combine("Configs", "setting.json"));

        if (file.Directory?.Exists == false)
        {
            file.Directory.Create();
        }


        // 提供默认设置
        await File.WriteAllTextAsync(file.FullName,
            JsonSerializer.Serialize(setting, JsonOption.JsonSerializerOptions));
    }
}