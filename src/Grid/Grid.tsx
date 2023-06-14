import GuessBtn from "../GuessBtn/GuessBtn";
import GridI from '../../interfaces/GridI'
import './Grid.css';
import { useState, useEffect } from 'react';

export default function Grid({name, weigth, heigth, types, legendary, baby, mythical} : GridI) {
    const[weight, setWeight] = useState<number>();
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => {
        res.json().then(data => {
            
        })
    })
    }, [])

    const [guessed, setGuessed] = useState<boolean>(false);
    return (
        <div className="Grid">
            <GuessBtn attrName="Weigth"/>
            <GuessBtn attrName="Heigth"/>
            <GuessBtn attrName="Types"/>
            <GuessBtn attrName="Is Legendary"/>
            <GuessBtn attrName="Is Baby"/>
            <GuessBtn attrName="Is Mythical"/>
        </div>
    )
}
