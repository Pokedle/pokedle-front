import { create } from 'zustand'

const useAttributesStore = create((set) => ({
    hp: "",
    baby: "",
    color: "",
    flavorText: "",
    mythical: "",
    legendary: "",
    speed: "",
    generation: "",
    height: "",
    weight: "",
    types: [],
    setGeneration: (newGeneration) => set({generation: newGeneration}),
    setHp: (newHp) => set({hp: newHp}),
    setBaby: (newBaby) => set({baby: newBaby}),
    setColor: (newColor) => set({color: newColor}),
    setFlavor: (newFlavor) => set({flavor_text: newFlavor}),
    setLegendary: (newLegendary) => set({legendary: newLegendary}),
    setMythical: (newMythical) => set({mythical: newMythical}),
    setSpeed: (newSpeed) => set({speed: newSpeed}),
    setTypes: (newTypes) => set({types: newTypes}),
    setHeight: (newHeight) => set({height: newHeight}),
    setWeight: (newWeight) => set({weight: newWeight}),
}))

export default useAttributesStore;