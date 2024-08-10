import { create } from 'zustand';

interface CategoryState {
  category: string;
  setCategory: (category: string) => void;
  clearCategory: () => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  category:"",
  setCategory: (category: string) => set({ category }),
  clearCategory: () => set({ category: '' }),
}));

export default useCategoryStore;
