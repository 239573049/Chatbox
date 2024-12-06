import { StateCreator } from "zustand";
import { ModelsStore } from "./store";
import ModelService from "@/service/ModelService";
import { AgentModel } from "@/types/Model";

export interface ModelsStoreAction {
    setSearchValue: (value: string) => Promise<void>;
    initModels: () => Promise<void>;
    switchModel:(model:AgentModel) => Promise<void>;
    updateNavExpanded:(navExpanded:boolean)=>void;
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
    async initModels() {
        const models = await ModelService.getModels();
        set({
            models,
            model:models[0]
        })
    },
    async switchModel(model){
        if(model === get().model){
            return;
        }

        set({
            model
        })
    },
    updateNavExpanded(navExpanded) {
        set({
            navExpanded:!navExpanded
        })
    },
})