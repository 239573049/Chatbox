
export enum SideKey {
    Chat = "Chat",
    Search = "Search",
}

export interface GlobalState {
    theme: 'dark' | 'light' | 'auto';
    sideKey: SideKey;
}

export const initialState: GlobalState = {
    theme: (localStorage.getItem('chat-theme') as 'dark' | 'light' | 'auto') || 'auto',
    sideKey: SideKey.Chat,
};

