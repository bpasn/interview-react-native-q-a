import { create } from 'zustand';

interface StorateDialogBoard {
    visible: boolean;
    onClose: () => void;
    onOpen: () => void;
}
const useStoreDialogBoard = create<StorateDialogBoard>(
    (set) => ({
        visible: false,
        onClose: () => set({ visible: false }),
        onOpen: () => set({ visible: true }),
    })
);

export default useStoreDialogBoard;