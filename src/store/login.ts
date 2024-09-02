import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ILogin } from '../types';
const useLoginStore = create<ILogin>()(
    devtools(
        persist(
            (set, get): {} => ({
                authResponse: {
                    expiresAt: 0
                },
                isValidate: () => {
                    if (!get().authResponse) {
                        return false;
                    }
                    return get().authResponse?.expiresAt > Date.now();
                },
                isLogin: () => {
                    return get().authResponse.expiresAt ? true : false;
                },
                setAuthResponse: (authResponse) => {
                    set((state) => {
                        return { ...state, authResponse };
                    });
                }
            }),
            {
                name: 'login'
            }
        )
    )
);

export default useLoginStore;
