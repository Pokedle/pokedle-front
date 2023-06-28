import './Daily.css'
import '../style.css'
import { useState, useEffect } from 'react'
import useStore from "../nameStore";
import { ReactNode } from 'react';
import Line from '../Line/Line';

export default function Daily() {
    const store = useStore();
    const [guess, setGuess] = useState<string>();
    const [guesses, setGuesses] = useState<ReactNode[]>([]);

    function doGuess() {
        if(guess) {
            if(guess === store.name) {
                window.alert('Você ganhou')
            } else {
                setGuesses([...guesses, <Line name={guess}/>])
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
            <h1>Bem vindo(a) ao <i>desáfio diário</i></h1>
            <div className="guess">
                <input type='text' onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress}/>
                <button onClick={doGuess}>Adivinhar!</button>
            </div>
            <div className='lines'>
                {guesses}
            </div>
        </div>
    )
}