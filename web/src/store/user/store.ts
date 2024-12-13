import { createUserAction, UserAction } from './action';
import { createWithEqualityFn } from 'zustand/traditional';
import { initialState, UserState } from './initialState';
import { StateCreator } from 'zustand/vanilla';
import { shallow } from 'zustand/shallow';
import { createDevtools } from '../middleware/createDevtools'
;
export type UserStore = UserState 
  & UserAction;

const createStore: StateCreator<UserStore, [['zustand/devtools', never]]> = (...parameters) => ({
    ...initialState,
    ...createUserAction(...parameters),
});

const devtools = createDevtools('file');

export const useUserStore = createWithEqualityFn<UserStore>()(devtools(createStore), shallow);