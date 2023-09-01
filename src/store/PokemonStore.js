import { create } from "zustand";
const usePokemonStore = create((set) => ({
  counter: 5,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));
export default usePokemonStore;
