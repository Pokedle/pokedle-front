import './Main.css';
import { 
    ReactNode,
    useEffect,
 } from 'react';
import useStore from "../nameStore";
import useAttributesStore from "../attributesStore";
import '../style.css'
import allPokemonsStore from '../allPokemonsStore';

export default function Main(props: {component: ReactNode}) {
    const store = useStore();
    const attrStore = useAttributesStore();
    const pokemonsStore = allPokemonsStore();
    
    useEffect(() => {
        fetch('http://localhost:3030/pokemons/generateDaily', {
            method: "POST"
        }).then(res => res.json().then(async data => {
            await store.changeName(data.nome)
        }))
    }, [store])

    useEffect(() => {
        console.log(store.name)
    }, [store.name])

    const setTypes = (types: any): string[] => {
        if(types[1]) {
            return [types[0].type.name, types[1].type.name]
        } else {
            return [types[0].type.name]
        }
    }

    useEffect(() => {
        store.name !== undefined &&
        fetch(`https://pokeapi.co/api/v2/pokemon/${store.name}`, {
            method: 'GET'
        }).then(response => response.json().then(result => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${store.name}`, {
                method: 'GET'
            }).then(res => res.json().then( species => {
                attrStore.setHp(result.stats[0].base_stat)
                attrStore.setSpeed(result.stats[5].base_stat)
                attrStore.setBaby(species.is_baby)
                attrStore.setLegendary(species.is_legendary)
                attrStore.setBaby(species.is_baby)
                attrStore.setBaby(species.is_baby)
                attrStore.setColor(species.color.name)
                attrStore.setMythical(species.is_mythical)
                attrStore.setGeneration(species.generation.url.split('/')[6])
                attrStore.setHeight(result.height)
                attrStore.setWeight(result.weight)
                attrStore.setTypes(setTypes(result.types))
            }))
        }))

    }, [store.name])

    

    useEffect(() => {
        console.log(attrStore);
    }, [attrStore])

    useEffect(() => {
        fetch('http://localhost:3030/pokemons', {
            'method': 'GET'
        }).then(res => res.json().then(data => {
            pokemonsStore.setPokemons(data)
        }))
    }, [pokemonsStore])

    return(
        <div className="main">
            {props.component}
        </div>
    )
}