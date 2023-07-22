import { useEffect, useState } from 'react';
import './Line.css';
import useAttributesStore from '../attributesStore';
import arrow1 from '../assets/1_arrow.png';
import arrow2 from '../assets/2_arrows.png';

export default function Line(props: {name: string}) {

    const attrStore = useAttributesStore();

    const [hp, setHp] = useState<number>();
    const [baby, setBaby] = useState<boolean>();
    const [color, setColor] = useState<string>();
    const [text, setText] = useState<string>();
    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [mythical, setMythical] = useState<boolean>();
    const [legendary, setLegendary] = useState<boolean>();
    const [speed, setSpeed] = useState<number>();
    const [generation, setGeneration] = useState<number>();
    const [types, setTypes] = useState<string[]>([]);
    const [bTypeIncluded, setbTypeIncluded] = useState<number>(0)

    const [highest, setHighest] = useState<number>()


    useEffect(() => {
        props.name && fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`).then(res => res.json().then(data => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`).then(response => response.json().then(async species => {
                setHp(data.stats[0].base_stat)
                setHeight(data.height)
                setWeight(data.weight)
                setSpeed(data.stats[5].base_stat)
                setBaby(species.is_baby)
                setLegendary(species.is_legendary)
                setBaby(species.is_baby)
                setColor(species.color.name)
                setMythical(species.is_mythical)
                setGeneration(species.generation.url.split('/')[6])
                setTypes(typeHandler(data.types))
            }))
        }))
    }, [props.name])
    
    const typeHandler = (types: any): string[] => {
        if(types[1]) {
            return [types[0].type.name, types[1].type.name]
        } else {
            return [types[0].type.name]
        }
    }

    useEffect(() => {
        if(hp && speed && generation && height && weight) {
            const arr = [Math.abs(attrStore.hp - hp), Math.abs(height - attrStore.height), Math.abs(weight - attrStore.weight), Math.abs(attrStore.speed - speed), Math.abs(attrStore.generation - generation)]
            setHighest(arr.sort((a, b) => {return a - b}).reverse()[0])
        }

        if(types.length >= 1) {
            if(types.length > attrStore.types.length) {
                attrStore.types[0] in types && setbTypeIncluded(1)
            } else if (types.length < attrStore.types.length) {
                types[0] in attrStore.types && setbTypeIncluded(1)
            } else if (types === attrStore.types) {
                setbTypeIncluded(2)
            } else if (types.length === attrStore.types.length) {
                if(types[0] in attrStore.types && types[1] in attrStore.types) {
                    setbTypeIncluded(2)
                } else if(types[0] in attrStore.types || types[1] in attrStore.types) {
                    setbTypeIncluded(1)
                } 
            }
        }
    } , [types])


    return (
        <>
        {
        hp && generation && speed && highest && height && weight && types &&
        <div className="line">
            <div className="guessInput" style={{backgroundColor: hp === attrStore.hp ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px', position: 'relative'}}>
                {Math.abs(attrStore.hp - hp) > 20 && 
                <>
                <img src={arrow2} alt='seta' style={{rotate: hp > attrStore.hp ? '90deg': '270deg'}} className='arrow2'/>
                </>}
                {Math.abs(attrStore.hp - hp) < 20 ? 
                    <>
                    <img src={arrow1} alt='seta' style={{rotate: hp > attrStore.hp ? '180deg': '0deg'}} className='arrow'/>
                    </> : <></>
                }
                <p>{hp}</p>
            </div>
            <div className="guessInput" style={{backgroundColor: speed === attrStore.speed ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
                <p>{speed}</p>
            </div>
            <div className="guessInput" style={{backgroundColor: generation === attrStore.generation ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
                <p>{generation}</p>
            </div>            
            <div className="guessInput" style={{backgroundColor: bTypeIncluded === 2 ? '#008000' : bTypeIncluded === 1 ? 'yellow' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
                <div className="types">{types.map(el => (<p>{el}</p>))}</div>
            </div>
            <div className="guessInput" style={{backgroundColor: color === attrStore.color ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
                <p>{color}</p>
            </div>  
            <div className="guessInput" style={{backgroundColor: height === attrStore.height ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
                {Math.abs(attrStore.height - height) > 3 ? 
                <>
                <img src={arrow2} alt='seta' style={{rotate: height > attrStore.height ? '90deg': '270deg'}} className='arrow2'/>
                </>: Math.abs(attrStore.height - height) <= 3 ? 
                <>
                <img src={arrow1} alt='seta' style={{rotate: height > attrStore.height ? '180deg': '0deg'}} className='arrow'/>
                </>: <>{Math.abs(attrStore.height - height)}</>
                }
                <p>{height}ft</p>
            </div>    
            <div className="guessInput" style={{backgroundColor: weight === attrStore.weight ? '#008000' : '#FE0000', height: highest * 3 < 180 ? `${highest * 3}px`: '180px'}}>
            {Math.abs(attrStore.weight - weight) > 20 && 
                <>
                <img src={arrow2} alt='seta' style={{rotate: weight > attrStore.weight ? '90deg': '270deg'}} className='arrow2'/>
                </>}
                {Math.abs(attrStore.weight - weight) < 20 ? 
                    <>
                    <img src={arrow1} alt='seta' style={{rotate: weight > attrStore.weight ? '180deg': '0deg'}} className='arrow'/>
                    </> : <></>
                }
                <p>{weight}</p>
            </div>     
            {/* <div className="guessInput" style={{backgroundColor: baby === attrStore.baby ? '#008000' : '#FE0000', height: `${highest * 0.6}px`}}>
                {baby}
            </div>  
            <div className="guessInput" style={{backgroundColor: legendary === attrStore.legendary ? '#008000' : '#FE0000', height: `${highest * 0.6}px`}}>
                {legendary}
            </div>  
            <div className="guessInput" style={{backgroundColor: mythical === attrStore.mythical ? '#008000' : '#FE0000', height: `${highest * 0.6}px`}}>
                {mythical}
            </div>    */}
        </div>
        }
        </>
    )
}