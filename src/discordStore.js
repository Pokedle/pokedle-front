import { create } from 'zustand'

const guessStore = create((set) => ({
    username: "",
    pfp: "",
    accessToken: "",
    setUsername: (newUsername) => set({username: newUsername}),
    setPfp: (newPfp) => set({pfp: newPfp}),
    setAccessToken: (newAccessToken) => set({accessToken: newAccessToken})
}))

export default guessStore;