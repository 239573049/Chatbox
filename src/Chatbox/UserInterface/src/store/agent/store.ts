
import { StateCreator } from "zustand";
import { agentActionSlice, AgentStoreAction } from "./action";
import { AgentState, initialAgentState } from "./initialState";
import { createDevtools } from "../middleware/createDevtools";
import { createWithEqualityFn } from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from 'zustand/shallow';

export type AgentStore = AgentState & AgentStoreAction;


const createStore: StateCreator<AgentStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialAgentState,
    ...agentActionSlice(...parameters),
});

const devtools = createDevtools('agent');

export const useAgentStore = createWithEqualityFn<AgentStore>()(
    subscribeWithSelector(devtools(createStore)),
    shallow,
);
