import { StateCreator } from "zustand";
import { GlobalStore } from "./store";
import { SideKey } from "./initialState";

export interface GlobalStoreAction {
    switchTheme: (theme: 'dark' | 'light' | 'auto') => void;
    switchSide: (sideKey: SideKey) => void;
}


export const globalActionSlice: StateCreator<
    GlobalStore,
    [['zustand/devtools', never]],
    [],
    GlobalStoreAction
    > = (set, get) => ({
    switchTheme(theme) {
        if(get().theme === theme){
            return
        }
        
        localStorage.setItem('chat-theme', theme)
        set({
            theme: theme
        })
    },
    switchSide(sideKey) {
        set({
            sideKey: sideKey
        })
    },
})