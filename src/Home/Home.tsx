import './Home.css';
import '../style.css';
import {  
    useEffect,
    useState
} from 'react';
import ChallengeI from '../interfaces/Challenge.interface';
import Header from '../Header/Header';
import pikachu from '../assets/pikachu-running.gif'

export default function Home() {
    const [challenges, setChallenges] = useState<ChallengeI[]>([]);

    useEffect(() => {
        fetch('http://localhost:3030/challenges').then(res => res.json().then((challenges: ChallengeI[]) => {
            setChallenges(challenges)
        }))
      }, [])


    return (
        <div className="content home">
            <Header/>
            <article className='challenges'>
                {challenges.length > 0 && challenges.map((el: ChallengeI) => (
                <div className='challenge' style={{backgroundImage: `url(${require(`../assets/${el.bg}`)})`}} onClick={() => window.location.replace(`/${el.name.replace(' ', '').toLowerCase()}`)}>
                    <h1>{el.name}</h1>
                </div>
                ))
                } {
                    challenges.length <= 0 && 
                    <>
                    <img src={pikachu} alt="pikachu correndo" />
                    </>
                }
            </article>
        </div>
    )
}