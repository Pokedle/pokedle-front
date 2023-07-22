import './Daily.css'
import '../style.css'
import { useState, useEffect, useRef } from 'react'
import useStore from "../nameStore";
import { ReactNode } from 'react';
import Line from '../Line/Line';
import Header from '../Header/Header';
import allPokemonsStore from '../allPokemonsStore';

export default function Daily() {
    const store = useStore();
    const allPokemons = allPokemonsStore();
    const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
    const [guess, setGuess] = useState<string>();
    const [guesses, setGuesses] = useState<ReactNode[]>([]);
    const input = useRef<HTMLInputElement | null>(null);

    function doGuess() {
        if(guess) {
            if(guess.toLowerCase() === store.name) {
                window.alert('Você ganhou')
            } else {
                setGuesses([<Line name={guess}/>, ...guesses])
                setGuess('')
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          doGuess();
        }
      };

    const handleClick = (name: string) => {
        setGuess(name)
        if(input.current != null) {
            input.current.value = name;
        }
        setSuggestions([])
    }

      interface Pokemon {
            name: string,
            url: string
      }
    
      useEffect(() => {
        if(guess && guess.length >= 3) {
            var arr: Pokemon[] = []
            allPokemons.pokemons.forEach((pokemon: Pokemon) => {
                if(pokemon.name.includes(guess)) {
                    console.log(pokemon.name)
                    arr.length < 7 && arr.push(pokemon)
                }
            })
            setSuggestions(arr)
        } else {
            arr = []
            setSuggestions(arr)
        }
      }, [guess])

    return (
        <div className='content daily'>
            <Header/>
            <h1>Bem vindo(a) ao <i>desáfio diário</i></h1>
            <div className="guess">
                <div className="guessSpace">
                    <input type='text' onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress} className='txtSpace' ref={input}/>
                    <button onClick={doGuess}>Adivinhar!</button>
                </div>
                <div className="guessSpace">
                    <div className="suggestions">
                        {suggestions && <>
                            {
                            suggestions.map((pokemon: Pokemon) => (
                                <div className='suggestion' onClick={() => handleClick(pokemon.name)}>
                                    <img src={pokemon.url} alt={pokemon.name} style={{width: '40px', height: '40px'}}/>
                                    <p>{pokemon.name}</p>
                                </div>
                            ))
                            }
                        </>}
                    </div>
                </div>
            </div>
            <div className='lines'>
                {guesses.length >=1  &&
                <div className='line'>
                    <div className="guessInput">Hp</div>
                    <div className="guessInput">Speed</div>
                    <div className="guessInput">Gen</div>
                    <div className="guessInput">Types</div>
                    <div className="guessInput">Color</div>
                    <div className="guessInput">Height</div>
                    <div className="guessInput">Weight</div>
                </div>
                }
                {guesses}
            </div>
        </div>
    )
}