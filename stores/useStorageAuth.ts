import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
    email: string;
}

interface IStoreAuth {
    signIn: (email: string, password: string) => void;
    signUp: () => void;
    users: IUser | null;
    loggedIn: boolean;
}
const useStoreAuth = create<IStoreAuth>()(
    persist((
        (set, get) => ({
            users: null,
            loggedIn:false,
            signIn:(email:string,password:string) => {

            },
            signUp:() => {}
        })
    ), {
        name: "user-info-store",
        storage: createJSONStorage(() => AsyncStorage)
    })
);

export default useStoreAuth;