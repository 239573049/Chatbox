

export interface UserState {
    isSignIn: boolean;
    userInfo: any;
    isLoading: boolean;
}

export const initialState: UserState = {
    isSignIn: localStorage.getItem('token') ? true : false,
    userInfo: null,
    isLoading: false,
};
