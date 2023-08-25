import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main/Main';
import Daily from './Daily/Daily';
import Infinite from './Infinite/Infinite';
import Success from './Success/Success';
import Home from './Home/Home';
import useStore from "./nameStore";
import useAttributesStore from "./attributesStore";
import allPokemonsStore from './allPokemonsStore';


function App() {
    const store = useStore();
    const attrStore = useAttributesStore();
    const pokemonsStore = allPokemonsStore();
    const [response, setResponse] = useState<any>(0);
    
    useEffect(() => {
        fetch('http://localhost:3030/pokemons/generateDaily', {
            method: "POST"
        }).then(res => res.json().then(async data => {
            await store.changeName(data.nome)
            console.log(data.new)
            if (data.new === true) {
                localStorage.setItem('won', 'false')
                localStorage.setItem('lifes', '15')
            }
            console.log(localStorage)
        }))
    }, [])

    const setTypes = (types: any): string[] => {
        if(types[1]) {
            return [types[0].type.name, types[1].type.name]
        } else {
            return [types[0].type.name]
        }
    }
////////////////////////////////////////////////
    useEffect(() => {
        store.name !== '' &&
        console.log(store.name)
        fetch(`https://pokeapi.co/api/v2/pokemon/${store.name}`, {
            method: 'GET'
        }).then(response => response.json().then( result => {
            setResponse(result)
        }))

    }, [store.name])

    useEffect(() => {
        if(response !== 0) {
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${response.id}`, {
                method: 'GET'
                }).then(res => res.json().then( species => {
                    attrStore.setHp(response.stats[0].base_stat)
                    attrStore.setSpeed(response.stats[5].base_stat)
                    attrStore.setBaby(species.is_baby)
                    attrStore.setLegendary(species.is_legendary)
                    attrStore.setBaby(species.is_baby)
                    attrStore.setBaby(species.is_baby)
                    attrStore.setColor(species.color.name)
                    attrStore.setMythical(species.is_mythical)
                    attrStore.setGeneration(species.generation.url.split('/')[6])
                    attrStore.setHeight(response.height)
                    attrStore.setWeight(response.weight)
                    attrStore.setTypes(setTypes(response.types))
                    attrStore.setImgUrl(response.sprites.front_default)
                })) 
        }
    }, [response])
////////////////////////////////////////////////

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

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Main component={<Home/>}/>}/>
        <Route path='dailyChallenge' element={<Main component={<Daily />}/>}/>
        <Route path="infiniteChallenge" element={<Main component={<Infinite/>}/>}/>
        <Route path='success' element={<Success/>}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
