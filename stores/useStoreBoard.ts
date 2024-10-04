import { storageFirebase } from '@/config/firebaseConfig';
import { FirebaseService } from '@/services/firebaseService';
import { create } from 'zustand';
import useStoreLoading from './useStoreLoading';

const storage = new FirebaseService(storageFirebase);

interface StoreBoard {
    boardRef?: string;
    boards: Array<IBoard>;
    setBoard: (board: MasterBoard) => void;
    remove: (id: string) => Promise<void>;
    fetchBoard: () => Promise<void>;
}


const useStoreBoard = create<StoreBoard>()
    ((set, get) => ({
        boards: [],
        setBoard: async (board: MasterBoard) => {
            const query = storage.queryWhere<MasterBoard>("boards", "playerName", "==", board.playerName);
            const id = await storage.getByPlayerName(query);
            if (id) {
                await storage.update(id, board);
            } else {
                await storage.save(
                    {
                        name: "boards"
                    },
                    board
                )
            }
            get().fetchBoard();
        },
        remove: async (id: string) => {
            await storage.delete(id);
            get().fetchBoard();
        },
        fetchBoard: async () => {
            useStoreLoading.getState().setLoading();
            try {
                const boards = await storage.get<IBoard>("boards");
                const mapBoard: IBoard[] = boards.docs.map(c => ({ ...c.data(), id: c.id }));
                set({ boards: mapBoard });
            } catch (error) {
                console.log(error);
            } finally {
                useStoreLoading.getState().setLoading();
            }
        }
    }),
    );



export default useStoreBoard;