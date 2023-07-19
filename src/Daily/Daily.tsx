import './Daily.css'
import '../style.css'
import { useState, useEffect } from 'react'
import useStore from "../nameStore";
import { ReactNode } from 'react';
import Line from '../Line/Line';
import Header from '../Header/Header';

export default function Daily() {
    const store = useStore();
    const [guess, setGuess] = useState<string>();
    const [guesses, setGuesses] = useState<ReactNode[]>([]);

    function doGuess() {
        if(guess) {
            if(guess.toLowerCase() === store.name) {
                window.alert('Você ganhou')
            } else {
                setGuesses([<Line name={guess}/>, ...guesses])
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          doGuess();
        }
      };

    return (
        <div className='content daily'>
            <Header/>
            <h1>Bem vindo(a) ao <i>desáfio diário</i></h1>
            <div className="guess">
                <input type='text' onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress}/>
                <button onClick={doGuess}>Adivinhar!</button>
            </div>
            <div className='lines'>
                {guesses.length >= 1 && 
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