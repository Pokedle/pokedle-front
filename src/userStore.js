import { create } from 'zustand';

const userStore = create(set => ({
    logged: false,
    setLogged: (newLogged) => set({logged: newLogged})
}))

export default userStore