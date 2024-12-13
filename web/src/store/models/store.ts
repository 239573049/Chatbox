//  ===============  聚合 createStoreFn ============ //

import { StateCreator } from "zustand";
import { modelsActionSlice, ModelsStoreAction } from "./action";
import { ModelsState, initialState } from "./initialState";
import { createDevtools } from "../middleware/createDevtools";
import { createWithEqualityFn } from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from 'zustand/shallow';

export type ModelsStore = ModelsState & ModelsStoreAction;


const createStore: StateCreator<ModelsStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...modelsActionSlice(...parameters),
});

const devtools = createDevtools('models');

export const useModelsStore = createWithEqualityFn<ModelsStore>()(
    subscribeWithSelector(devtools(createStore)),
    shallow,
);
