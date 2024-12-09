import SettingContext from "@/service/SettingContext";
import { useChatStore } from "@/store/chat";
import { useGlobalStore } from "@/store/global"
import { ThemeProvider } from "@lobehub/ui"
import { useEffect, } from "react";

export default function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        // @ts-ignore
        window.external.sendMessage(`__bwv:["AttachPage","${window.location.origin + "/"}","${window.location.origin + "/"}"]`);
        // 等待100ms
        setTimeout(async () => {
            const setting = await SettingContext.GetSetting();
            useGlobalStore.getState().setSettings(setting);
            useChatStore.getState().setMeta({
                avatar: setting.avatar || '😄',
                nickname: setting.nickname || 'Token'
            });
        }, 100);
    }, []);

    const [theme, switchTheme] = useGlobalStore((state) => [state.theme, state.switchTheme]);



    return (
        <ThemeProvider
            style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'relative'
            }}
            themeMode={theme}
            onThemeModeChange={(theme) => switchTheme(theme)}
        >
            {children}
        </ThemeProvider>
    )
}