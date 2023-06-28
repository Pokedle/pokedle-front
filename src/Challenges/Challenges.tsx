import { ReactNode, useEffect, useState } from 'react'
import '../style.css'
import './Challenges.css'
import ChallengeI from '../interfaces/Challenge.interface';

export default function Challenges() {
    const [challenges, setChallenges] = useState<ChallengeI[]>([]);

    useEffect(() => {
        fetch('http://localhost:3030/challenges').then(res => res.json().then((challenges: ChallengeI[]) => {
            setChallenges(challenges)
        }))
      }, [])

    return (
        <div className="challenges content">
            
            {challenges.length > 0 && challenges.map((el: ChallengeI) => (
                <div className='challenge' style={{backgroundImage: `url(${require(`../assets/${el.bg}`)})`}}>
                    <h1>{el.name}</h1>
                    <a href={`/${el.name.replace(' ', '')}`}>
                        <div className='bottom' style={{backgroundColor: el.bg !== 'daily_challenge.png'? '#00b4d8' : '#FE2301'}}><p>Jogar</p></div>
                    </a>
                </div>
            ))}
        </div>
    )
}