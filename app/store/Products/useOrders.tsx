import { create } from 'zustand';

interface OrderState {
    order: any[];
    setOrder: (items: any[]) => void;
    clearOrder: () => void;
}

const useOrderStore = create<OrderState>((set) => ({
    order: [],
    setOrder: (items: any[]) => set((state) => ({
        order: [...state.order, ...items],
    })),
    clearOrder: () => set({ order: [] }),
}));

export default useOrderStore;
