import { create } from 'zustand'

const allPokemonsStore = create(set => ({
    pokemons: [],
    setPokemons: (newPokemons) => set({pokemons: newPokemons})
}))

export default allPokemonsStore