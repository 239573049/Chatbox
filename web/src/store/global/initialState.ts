import { Setting } from "@/types/setting";

export enum SideKey {
    Chat = "Chat",
    Search = "Search",
    Settings = "Settings"
}

export interface GlobalState {
    theme: 'dark' | 'light' | 'auto';
    sideKey: SideKey;
    hasNewVersion: boolean;
    latestVersion: string;
    settings: Setting | null;
}

export enum SettingsTabs {
    Common = 'common',
    Agent = 'agent',
}

export const initialState: GlobalState = {
    theme: (localStorage.getItem('chat-theme') as 'dark' | 'light' | 'auto') || 'auto',
    sideKey: SideKey.Chat,
    hasNewVersion: false,
    latestVersion: '',
    settings: null,
};

