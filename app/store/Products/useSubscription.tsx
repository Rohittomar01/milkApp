import { create } from 'zustand';

interface SubscriptionState {
    subscription: any[];
    setSubscription: (items: any[]) => void;
    clearSubscription: () => void;
}

const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: [],
    setSubscription: (items: any[]) => set({ subscription: items }),
    clearSubscription: () => set({ subscription: [] }),
}));

export default useSubscriptionStore;
