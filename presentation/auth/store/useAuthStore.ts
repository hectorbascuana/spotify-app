import { authCheckStatus, authLogin } from "@/core/auth/action/auth-action";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    changeStatus: (token?: string, user?: User) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: (user: User) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: 'checking',
    token: undefined,
    user: undefined,


    changeStatus: async (token?: string, user?: User) => {


        if (!token || !user) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            // await SecureStorage.deleteItem('token');
            // TODO: llamar a logout
            return false;
        }

        set({ status: 'authenticated', token: token, user: user });

        // await SecureStorage.setItem('token', token);

        return true;
    },

    // Actions
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);

        return get().changeStatus(resp?.token, resp?.user);
    },

    checkStatus: async (user: User) => {
        if (get().user) {
            return;
        }

        const resp = await authCheckStatus(user);

        get().changeStatus(resp?.token, resp?.user);
        return;

    },

    logout: async () => {
        // TODO: eliminar el token en secure storage

        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },
}))