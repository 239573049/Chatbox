import { createToolAction, ToolAction } from './action';
import { createWithEqualityFn } from 'zustand/traditional';
import { initialState, ToolState } from './initialState';
import { StateCreator } from 'zustand/vanilla';
import { shallow } from 'zustand/shallow';
import { createDevtools } from '../middleware/createDevtools'
;
export type ToolStore = ToolState 
  & ToolAction;

const createStore: StateCreator<ToolStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...createToolAction(...parameters),
});

const devtools = createDevtools('file');

export const useToolStore = createWithEqualityFn<ToolStore>()(devtools(createStore), shallow);