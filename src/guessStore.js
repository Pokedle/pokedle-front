import { create } from 'zustand'

const guessStore = create((set) => ({
    hp: null,
    baby: null,
    color: null,
    flavorText: null,
    mythical: null,
    legendary: null,
    speed: null,
    generation: null,
    height: null,
    weight: null,
    types: null,
    bTypeIncluded: 0,
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
    setbTypeIncluded: (newbTypeIncluded) => set({bTypeIncluded: newbTypeIncluded}),
}))

export default guessStore;