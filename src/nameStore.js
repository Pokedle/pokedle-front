import { create } from 'zustand'

const useStore = create((set) => ({
    name: "",
    changeName: (newName) => set({name: newName})
  }));

export default useStore
