import { StateCreator } from "zustand";
import { ToolStore } from "./store";

export interface ToolAction {
    setOpen(open: boolean): void;
    togglePlugin(identifier: string): void;
}

export const createToolAction: StateCreator<
    ToolStore,
    [['zustand/devtools', never]],
    [],
    ToolAction
    // @ts-ignore
> = (set, get) => ({
    setOpen: (open) => {
        set({ open });
    },
    togglePlugin: (identifier) => {
        set((state) => {
            const plugins = state.plugins;
            const index = plugins.indexOf(identifier);
            if (index === -1) plugins.push(identifier);
            else plugins.splice(index, 1);
            return { plugins };
        });
    },
});