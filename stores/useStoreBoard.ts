import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";


interface StoreBoard {
    boards: Array<IBoard>;
    setBoard: (board: IBoard) => void;
    remove:(id:string) => void;

}


const useStoreBoard = create<StoreBoard>()(persist(
    (set, get) => ({
        boards: [],
        setBoard: (board: IBoard) => {
            set({ boards: [...get().boards, board] });
        },
        remove:(id:string) => {
           return set({boards:get().boards.filter(e => e.id !== id)})
        }
    }),
    {
        name: "boards-store",
        storage: createJSONStorage(() => AsyncStorage), // Updated
        
    }
));



export default useStoreBoard;