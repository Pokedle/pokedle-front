import { create } from 'zustand'

const useAttributesStore = create((set) => ({
    hp: "",
    attack: "",
    defense: "",
    baby: "",
    color: "",
    flavorText: "",
    mythical: "",
    legendary: "",
    spAttack: "",
    spDefense: "",
    speed: "",
    generation: "",
    types: [],
    setGeneration: (newGeneration) => set({generation: newGeneration}),
    setHp: (newHp) => set({hp: newHp}),
    setAttack: (newAttack) => set({attack: newAttack}),
    setDefense: (newDefense) => set({defense: newDefense}),
    setBaby: (newBaby) => set({baby: newBaby}),
    setColor: (newColor) => set({color: newColor}),
    setFlavor: (newFlavor) => set({flavor_text: newFlavor}),
    setLegendary: (newLegendary) => set({legendary: newLegendary}),
    setMythical: (newMythical) => set({mythical: newMythical}),
    setSpAttack: (newSpAttack) => set({spAttack: newSpAttack}),
    setSpDefense: (newSpDefense) => set({spDefense: newSpDefense}),
    setSpeed: (newSpeed) => set({speed: newSpeed}),
    setTypes: (newTypes) => set({types: newTypes}),
}))

export default useAttributesStore;