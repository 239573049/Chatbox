import { StateCreator } from "zustand";
import { ModelsStore } from "./store";
import { AgentModel } from "@/types/Model";
import { useChatStore } from "../chat";

export interface ModelsStoreAction {
    setSearchValue: (value: string) => Promise<void>;
    initModels: (models:any[]) => Promise<void>;
    switchModel: (model: AgentModel) => Promise<void>;
    updateNavExpanded: (navExpanded: boolean) => void;
}

export const modelsActionSlice: StateCreator<
    ModelsStore,
    [['zustand/devtools', never]],
    [],
    ModelsStoreAction
> = (set, get) => ({
    async setSearchValue(value) {
        set({
            search: value,
        })
    },
    async initModels(models) {
        set({
            models,
            model: models[0],
            navExpanded: true,
        })

        localStorage.setItem("model", models[0].id);
    },
    async switchModel(model) {
        if (model === get().model) {
            return;
        }

        set({
            model
        })
        localStorage.setItem("model", model.id);

        useChatStore.getState().updateSessionId(model.id);
    },
    updateNavExpanded(navExpanded) {
        set({
            navExpanded: navExpanded
        })
    },
})