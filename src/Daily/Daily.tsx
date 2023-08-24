import './Daily.css'
import '../style.css'
import { useState, useEffect, useRef } from 'react'
import useStore from "../nameStore";
import { ReactNode } from 'react';
import Line from '../Line/Line';
import Header from '../Header/Header';
import allPokemonsStore from '../allPokemonsStore';
import Ending from '../Ending/Ending';
import useAttributesStore from '../attributesStore';
import redHeart from '../assets/red_heart.png'
import blackHeart from '../assets/black_heart.png'

export default function Daily() {
    const store = useStore();
    const allPokemons = allPokemonsStore();
    const attrStore = useAttributesStore();
    const [lastGuess, setLastGuess] = useState<string | null>(); 
    const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
    const [guess, setGuess] = useState<string>();
    const [guesses, setGuesses] = useState<ReactNode[]>([]);
    const input = useRef<HTMLInputElement | null>(null);
    const [health, setHealth] = useState<number | null>(Number(localStorage.getItem('lifes')));
    const [suggestionClicked, setSuggestionClicked] = useState<boolean>(false);
    const [victory, setVictory] = useState<boolean| null>(null);
    const [hearts, setHearts] = useState<ReactNode[] | null>();

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if(localStorage.getItem('lifes') === null) {
            localStorage.setItem("lifes", "15") 
            localStorage.setItem("won", 'false')
            setHealth(15)
        } 
    }, [])

    useEffect(() => {
        var arr: ReactNode[] = []
        if(health) {
            for(var j = 0; j < 15; j++) {
                j < health ? arr.push(<img src={redHeart} alt='red heart' className='heart'/>) : arr.push(<img src={blackHeart} alt='black heart' className='heart'/>)
            }
            setHearts(arr)
        }
    }, [health])

    function doGuess(name?: string) {
        if(victory === null) {
            if(name) {
                verifyGuess(name)
            } else {
                if (guess) {
                    verifyGuess(guess)
                }
            }
        }
        if(health && health <= 0) {
            finishGame(false)
        }
    }

    const verifyGuess = (name: string) => {
        if(name !== lastGuess) {
            if(name.includes(' ')) {name = name.replace(' ', '-')}
        if(name.toLowerCase() === store.name) {
            finishGame(true)
        } else {
            if(health) {
                setGuesses([<Line name={name}/>, ...guesses])
                localStorage.setItem('lifes', String(Number(health - 1)))
                setHealth(health - 1);
            }
        }
        setLastGuess(name)
        setSuggestions([])
        name = ''
        setGuess('')
        clearInput()
        }
    }

    const finishGame = (won: boolean) => {
        if(won) {
            setVictory(true)
        } else {
            setVictory(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          suggestions.length > 0 ? doGuess(suggestions[0].name) : doGuess()
        }
      };

    const handleClick = (name: string) => {
        setSuggestionClicked(true)
        setGuess(name)
        if(input.current != null) {
            doGuess(name)
        }
    }

    function clearInput() {
        if(input.current && input.current.value !== null) {
            input.current.value = ''
        }
    }

    interface Pokemon {
        name: string,
        url: string
    }
    
      useEffect(() => {
        if(!suggestionClicked) {
            if(guess && guess.length >= 3) {
                var arr: Pokemon[] = []
                allPokemons.pokemons.forEach((pokemon: Pokemon) => {
                    if(pokemon.name.includes(guess)) {
                        arr.length < 7 && arr.push(pokemon)
                    }
                })
                setSuggestions(arr)
            } else {
                arr = []
                setSuggestions(arr)
            }
        } else {
            setSuggestions([])
            setSuggestionClicked(false)
        }
        
      }, [guess])

    return (
        <div className='content daily'>
            <Header/>
            <h1>Bem vindo(a) ao <i>desafio diário</i></h1>
            <div className="guess">
                <div className="guessSpace">
                    <input type='text' onChange={(e) => setGuess(e.target.value.toLowerCase())} onKeyPress={handleKeyPress} className='txtSpace' ref={input}/>
                    <button onClick={() => doGuess}><p>Adivinhar!</p></button>
                    <div className="suggestions" style={{height: `${suggestions.length * 40}px`}}>
                        {
                            suggestions && suggestions.map((pokemon) => (
                                <div className='suggestion' onClick={() => handleClick(pokemon.name)}>
                                    <img src={pokemon.url} alt={pokemon.name}/>
                                    <p>{pokemon.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="lifes">
                    {hearts}
                </div>
            </div>
            {guesses.length >=1  && 
            <div className='line'>
                {windowSize.current[0] >= 1000 && <div className="guessInput attributes no-border"></div>}
                <div className="guessInput attributes">Hp</div>
                <div className="guessInput attributes">Speed</div>
                <div className="guessInput attributes">Gen</div>
                <div className="guessInput attributes">Types</div>
                <div className="guessInput attributes">Color</div>
                <div className="guessInput attributes">Height</div>
                <div className="guessInput attributes">Weight</div>
            </div>
            }
            {guesses}
            {victory === false && hearts && <Ending won={false} url={attrStore.imgUrl} name={attrStore.name} lifes={hearts}/>}
            {victory === true || localStorage.getItem('won') === 'true' && hearts && <Ending won={true} url={attrStore.imgUrl} name={attrStore.name} lifes={hearts}/>}
        </div>
    )
}