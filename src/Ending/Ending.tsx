import './Ending.css'
import '../style.css'
import '../Daily/Daily.css'
import { ReactNode, useEffect } from 'react'

export default function Ending(props: {won: boolean, name: string, url: string, lifes: ReactNode[]}) {
    return (
        <div className='ending'>
            {props.won === true ? 
            <>
                <div className="endingScreen">
                    <h2>Parabéns, você ganhou!!</h2>
                    <img src={props.url} alt="Imagem do pokemon" />
                    <p>{props.name}</p>
                    <p>Vidas restantes:</p>
                    <div className="lifes">
                    {props.lifes}
                    </div>
                    <a href='/' className='goToChallenges'><div>Voltar para Desafios</div></a>
                </div>

            </>: 

            <>
            <div className="endingScreen">
                <h2>Você perdeu {':('}</h2>
                <p>O pokémon escolhido era: </p>
                <img src={props.url} alt='Imagem do pokemon correto'/>
                <p>{props.name}</p>
                <a href='/' className='goToChallenges'><div>Voltar para Desafios</div></a>
            </div>
            </>
            }
        </div>
    )
}