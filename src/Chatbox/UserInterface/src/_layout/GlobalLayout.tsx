import { useGlobalStore } from "@/store/global"
import { ThemeProvider } from "@lobehub/ui"
import { useEffect } from "react";


export default function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        // @ts-ignore
        window.external.sendMessage(`__bwv:["AttachPage","${window.location.origin + "/"}","${window.location.origin + "/"}"]`)
    }, []);

    const [theme, switchTheme] = useGlobalStore((state) => [state.theme, state.switchTheme]);

    return (<ThemeProvider
        style={{
            height: '100vh',
            overflow: 'hidden'
        }}
        themeMode={theme}
        onThemeModeChange={(theme) => switchTheme(theme)}
    >
        {children}
    </ThemeProvider>)
}