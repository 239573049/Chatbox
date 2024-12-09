import { Setting } from "@/types/setting";

declare const DotNet: any;

class SettingContext {
    public static async GetSetting(): Promise<Setting> {
        return await DotNet.invokeMethodAsync('Chatbox', 'GetSetting');
    }
    
    public static async SaveSetting(setting: Setting): Promise<void> {
        await DotNet.invokeMethodAsync('Chatbox', 'SaveSetting', setting);
    }
}

export default SettingContext;
