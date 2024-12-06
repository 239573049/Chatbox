import { StateCreator } from "zustand";
import { ChatStore } from "./store";

export interface ChatStoreAction {
    updateInputMessage: (vaule: string) => void;
    stopGenerateMessage: () => Promise<void>;
    addAIMessage: () => Promise<void>;
}


export const chatActionSlice: StateCreator<
    ChatStore,
    [['zustand/devtools', never]],
    [],
    ChatStoreAction
> = (set, get) => ({
    updateInputMessage(vaule) {
        set({
            message: {
                ...get().message,
                value: vaule
            }
        })
    },
    async stopGenerateMessage() {
        set({
            isAIGenerating: false
        })
    },
    async addAIMessage() {

    },
})