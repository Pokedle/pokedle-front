import './Daily.css'
import '../style.css'
import { useState, useRef, useEffect } from 'react'
import useStore from "../nameStore";
import { ReactNode } from 'react';
import Line from '../Line/Line';

export default function Daily() {
    const store = useStore();
    const [guess, setGuess] = useState<string>();
    const [guesses, setGuesses] = useState<ReactNode[]>([]);
    const input = useRef<HTMLInputElement>(null)

    function doGuess() {
        if(guess) {
            if(guess === store.name) {
                window.alert('Você ganhou')
            } else {
                guesses.unshift(<Line name={guess}/>)
            }
        }
        if(input.current?.value != null) {
            input.current.value = "";
        }
    }

    useEffect(() => {
        guesses.reverse()
    }, [guesses])

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          doGuess();
        }
    };

    return (
        <div className='content daily'>
            <h1>Bem vindo(a) ao <i>desáfio diário</i></h1>
            <div className="guess">
                <input type='text' onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress} ref={input}/>
                <button onClick={doGuess}>Adivinhar!</button>
            </div>
            {guesses && 
                <div className="firstRow">
                    <div className="attr">
                        <h2>Hp</h2>
                    </div>
                    <div className="attr">
                        <h2>Speed</h2>
                    </div>
                    <div className="attr">
                        <h2>Gen</h2>
                    </div>
                    <div className="attr">
                        <h2>Types</h2>
                    </div>
                    <div className="attr">
                        <h2>Color</h2>
                    </div>
                    <div className="attr">
                        <h2>Height</h2>
                    </div>
                    <div className="attr">
                        <h2>Weight</h2>
                    </div>
                </div>
            }
            <div className='lines'>
                {guesses}
            </div>
           
        </div>
    )
}