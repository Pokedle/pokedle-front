import { useEffect, useState } from 'react';
import './Line.css';
import useAttributesStore from '../attributesStore';
import arrow from '../assets/arrow.png';

export default function Line(props: {name: string}) {

    const attrStore = useAttributesStore();

    const [hp, setHp] = useState<number>();
    const [attack, setAttack] = useState<number>();
    const [defense, setDefense] = useState<number>();
    const [baby, setBaby] = useState();
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [mythical, setMythical] = useState();
    const [legendary, setLegendary] = useState();
    const [spAttack, setSpAttack] = useState<number>();
    const [spDefense, setSpDefense] = useState<number>();
    const [speed, setSpeed] = useState<number>();
    const [generation, setGeneration] = useState<number>();
    const [types, setTypes] = useState([]);

    const [highest, setHighest] = useState<number>()


    useEffect(() => {
        props.name && fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`).then(res => res.json().then(data => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`).then(response => response.json().then(async species => {
                setHp(data.stats[0].base_stat)
                setAttack(data.stats[1].base_stat)
                setDefense(data.stats[2].base_stat)
                setSpAttack(data.stats[3].base_stat)
                setSpDefense(data.stats[4].base_stat)
                setSpeed(data.stats[5].base_stat)
                setBaby(species.is_baby)
                setLegendary(species.is_legendary)
                setBaby(species.is_baby)
                setBaby(species.is_baby)
                setColor(species.color.name)
                setMythical(species.is_mythical)
                setGeneration(species.generation.url.split('/')[6])
                setTypes(data.types)
            }))
        }))
    }, [props.name])

    useEffect(() => {
        if(hp && attack && defense && spDefense && spAttack && speed && generation ) {
            const arr = [Math.abs(attrStore.hp - hp), Math.abs(attack - attrStore.attack), Math.abs(defense - attrStore.defense), Math.abs(spAttack - attrStore.spAttack), Math.abs(attrStore.spDefense - spDefense), Math.abs(attrStore.speed - speed), Math.abs(attrStore.generation - generation)]
            setHighest(arr.sort((a, b) => {return a - b}).reverse()[0])
        }
    } , [types])

    useEffect(() => {
        highest &&
        console.log(highest)
    }, [highest])



    return (
        <>
        {
        hp && attack && defense && spDefense && spAttack && generation && speed &&
        <div className="line">
            <div className="guessInput" style={{backgroundColor: hp === attrStore.hp ? 'green' : 'red', height: `${highest}px`}}>
                {hp}
            </div>
            <div className="guessInput" style={{backgroundColor: attack === attrStore.attack ? 'green' : 'red', height: `${highest}px`}}>
                {attack}
            </div>
            <div className="guessInput" style={{backgroundColor: defense === attrStore.defense ? 'green' : 'red', height: `${highest}px`}}>
                {defense}
            </div>
            <div className="guessInput" style={{backgroundColor: defense === attrStore.defense ? 'green' : 'red', height: `${highest}px`}}>
                {defense}
            </div>
            <div className="guessInput" style={{backgroundColor: speed === attrStore.speed ? 'green' : 'red', height: `${highest}px`}}>
                {speed}
            </div>
            <div className="guessInput" style={{backgroundColor: spAttack === attrStore.spAttack ? 'green' : 'red', height: `${highest}px`}}>
                {spAttack}
            </div>
            <div className="guessInput" style={{backgroundColor: spDefense === attrStore.spDefense ? 'green' : 'red', height: `${highest}px`}}>
                {spDefense}
            </div>

            <div className="guessInput" style={{backgroundColor: generation === attrStore.generation ? 'green' : 'red', height: `${highest}px`}}>
                {generation}
            </div>
        </div>
        }
        </>
    )
}
