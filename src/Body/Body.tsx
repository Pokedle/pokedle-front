import './Body.css'
import Grid from '../Grid/Grid'
import { useEffect, useState } from 'react'

export default function Body(props: {name : string, guessPoke: string}) {
    const [weight, setWeight] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [types, setTypes] = useState<any>();
    const [legendary, setLegendary] = useState<boolean>();
    const [baby, setBaby] = useState<boolean>()
    const [mythical, setMythical] = useState<boolean>()

    const typeHandler = (types : Array<{slot: string, type: {name: string, url: string}}>): void => {
        let tipos : string[] = []
        //@ts-ignore
        types[0].forEach((el: {slot: number, type: {name: string, url: string}}) => {
            tipos.push(el.type.name)
        });
        setTypes(tipos)
    } 

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.guessPoke}`).then(res => res.json()).then(poke => {
            setWeight(poke.weight)
            setHeight(poke.height)
            typeHandler([poke.types])
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke.id}/`).then(res => res.json().then(data => {
                setLegendary(data.is_legendary)
                setBaby(data.is_baby)
                setMythical(data.is_mythical)
            }))
        })
    }, [props.guessPoke])


    return(
        <div className='body'>
            {
            (mythical !== undefined && weight !== undefined && height !== undefined  && legendary !== undefined && baby !== undefined && types !== undefined) ?
            <Grid name={props.name} weigth={weight} heigth={height} baby={baby} legendary={legendary} types={types} mythical={mythical}/>
            : <h1>Loading</h1>
            }
        </div>
    )
}