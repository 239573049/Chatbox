import { StateCreator } from "zustand";
import { UserStore } from "./store";
import { message } from "antd";
import { getCurrentUser } from "@/service/User";

export interface UserAction {
    /**
     * 登录 
     */
    signIn: (token: string) => Promise<void>;
    /**
     * 登出
     */
    signOut: () => void;
}

export const createUserAction: StateCreator<
    UserStore,
    [['zustand/devtools', never]],
    [],
    UserAction
    // @ts-ignore
> = (set, get) => ({
    signIn: async (token) => {
        localStorage.setItem('token', token);
        set({
            isSignIn: true,
        });

        if(get().userInfo){
            return;
        }

        const result = await getCurrentUser();
        localStorage.setItem("user",JSON.stringify(result.data))
        if (result.code === 200) {
            set({
                userInfo: result.data,
            });
        }else{
            message.error(result.message);
        }
    },
    signOut: () => {
        localStorage.removeItem('token');
        set({
            isSignIn: false,
        })
    },
});