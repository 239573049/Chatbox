import { StateCreator } from "zustand";
import { AgentState } from "./initialState";

export interface AgentStoreAction {
    setDisplayMode: (mode: 'chat' | 'doc') => void;
}


// @ts-ignore
export const agentActionSlice: StateCreator<AgentState, [['zustand/devtools', never]], [], AgentStoreAction> = (set, get) => ({
    setDisplayMode(mode) {
        set({
            displayMode: mode
        })
    }
})

