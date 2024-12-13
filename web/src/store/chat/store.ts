import { StateCreator } from "zustand";
import { chatActionSlice, ChatStoreAction } from "./action";
import { ChatState, initialState } from "./initialState";
import { createDevtools } from "../middleware/createDevtools";
import { createWithEqualityFn } from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from 'zustand/shallow';

export type ChatStore = ChatState & ChatStoreAction;


const createStore: StateCreator<ChatStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...chatActionSlice(...parameters),
});

const devtools = createDevtools('chat');

export const useChatStore = createWithEqualityFn<ChatStore>()(
    subscribeWithSelector(devtools(createStore)),
    shallow,
);
