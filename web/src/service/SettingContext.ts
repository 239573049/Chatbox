import { Setting } from "@/types/setting";

class SettingContext {
    public static async GetSetting(): Promise<Setting> {
        const result = localStorage.getItem("setting");
        
        if (!result) {
            return {
                apiKey: "从https://api.token-ai.cn/平台获取的token",
                maxToken: 2048,
                avatar: "🦜",
                nickname: "Token"
            };
        }
        
        return JSON.parse(result) as Setting;
    }
    
    public static async SaveSetting(setting: Setting): Promise<void> {
        localStorage.setItem("setting", JSON.stringify(setting));
    }
}

export default SettingContext;
