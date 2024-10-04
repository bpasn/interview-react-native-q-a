import { create } from "zustand";


const useStoreLoading = create<{
    loading: boolean;
    setLoading: () => void;
}>()
    ((set, get) => {
        return ({
            loading: false,
            setLoading: () => set({ loading: !get().loading })
        });
    });

export default useStoreLoading;