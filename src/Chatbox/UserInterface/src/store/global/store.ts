//  ===============  聚合 createStoreFn ============ //

import { StateCreator } from "zustand";
import { globalActionSlice, GlobalStoreAction } from "./action";
import { GlobalState, initialState } from "./initialState";
import { createDevtools } from "../middleware/createDevtools";
import { createWithEqualityFn } from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from 'zustand/shallow';

export type GlobalStore = GlobalState & GlobalStoreAction;


const createStore: StateCreator<GlobalStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...globalActionSlice(...parameters),
});

const devtools = createDevtools('global');

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
    subscribeWithSelector(devtools(createStore)),
    shallow,
);
