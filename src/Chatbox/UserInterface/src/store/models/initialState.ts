import { AgentModel } from "@/types/Model";

export interface ModelsState {
    search: string;
    models: AgentModel[];
    model: AgentModel | null,
    navExpanded:boolean
}

export const initialState: ModelsState = {
    search: '',
    models: [],
    model: null,
    navExpanded: true
};

