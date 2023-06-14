import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './Main/Main';

function App() {
  const[random, setRandom] = useState<number>();
  const[pokemon, setPokemon] = useState<string>()

  function getRandomIntInclusive(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  useEffect(() => {
    var x = getRandomIntInclusive(1, 1010)
    setRandom(x)
  }, [])

  useEffect(() => {
    random && fetch(`https://pokeapi.co/api/v2/pokemon/${random}`).then(res => res.json().then(data => {
      setPokemon(data.name)
    }))
  }, [random])

  return (
    <div className="App">
      {pokemon && <Main name={pokemon}/>}
    </div>
  );
}

export default App;
