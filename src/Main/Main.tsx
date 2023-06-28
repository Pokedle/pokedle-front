import Aside from "../Aside/Aside";
import './Main.css'
import { 
    ReactNode,
    useEffect,
 } from 'react'
import useStore from "../nameStore";
import useAttributesStore from "../attributesStore";
import '../style.css'


export default function Main(props: {component: ReactNode}) {
    const store = useStore();
    const attrStore = useAttributesStore();
    
    useEffect(() => {
        fetch('http://localhost:3030/pokemons/generateDaily', {
            method: "POST"
        }).then(res => res.json().then(async data => {
            await store.changeName(data.nome)
        }))
    }, [store])

    useEffect(() => {
        store.name !== undefined &&
        fetch(`https://pokeapi.co/api/v2/pokemon/${store.name}`, {
            method: 'GET'
        }).then(response => response.json().then(result => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${store.name}`, {
                method: 'GET'
            }).then(res => res.json().then(async species => {
                attrStore.setHp(result.stats[0].base_stat)
                attrStore.setAttack(result.stats[1].base_stat)
                attrStore.setDefense(result.stats[2].base_stat)
                attrStore.setSpAttack(result.stats[3].base_stat)
                attrStore.setSpDefense(result.stats[4].base_stat)
                attrStore.setSpeed(result.stats[5].base_stat)
                attrStore.setBaby(species.is_baby)
                attrStore.setLegendary(species.is_legendary)
                attrStore.setBaby(species.is_baby)
                attrStore.setBaby(species.is_baby)
                attrStore.setColor(species.color.name)
                attrStore.setMythical(species.is_mythical)
                attrStore.setGeneration(species.generation.url.split('/')[6])
                attrStore.setTypes(result.types)
            }))
        }))

    }, [store.name])

    

    useEffect(() => {
        attrStore.speed !== undefined &&
        console.log(attrStore);
    }, [attrStore])

    return(
        <div className="main">
            <Aside/>
            {props.component}
        </div>
    )
}