import { create } from 'zustand';

const userStore = create(set => ({
    username: "",
    setUsername: (newUsername) => set({username: newUsername}),
}))

export default userStore