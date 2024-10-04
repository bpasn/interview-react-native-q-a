import { storageFirebase } from "@/config/firebaseConfig";
import { FirebaseService } from "@/services/firebaseService";
import { create } from "zustand";
import useStoreDialog from "./useStoreDialog";
import useStoreQuestion from "./useStoreQuestion";

interface IAuth {
    playerName: string | null,
    setPlayer: (playerName: string) => Promise<void>;

}

const useStoreAuth = create<IAuth>(
    (set, get) => ({
        playerName: null,
        setPlayer: async (playerName: string) => {
            const storage = new FirebaseService(storageFirebase);
            const pId = await storage.save<{playerName:string;}>({
                name: "players"
            }, {
                playerName
            });
            set({ playerName: pId });
        }
    })
);

export default useStoreAuth;