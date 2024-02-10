import { create } from 'zustand';

interface StoreDialogProps {
    visible: boolean;
    onClose: () => void;
    onOpen: () => void;
}
const useStoreDialog = create<StoreDialogProps>(
    (set) => ({
        visible: false,
        onClose: () => set({ visible: false }),
        onOpen: () => set({ visible: true }),
    })
);

export default useStoreDialog;