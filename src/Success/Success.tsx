import './Success.css'
import joie_pika from '../assets/joie-pikachu.gif'

export default function Success() {
    return (
        <div className="success">
            <div className="sMain">
                <h1>Integration with discord completed successfully!</h1>
                <img src={joie_pika} alt='pikachu running'/>
                <h2>Click <a href='http://localhost:3000/'>here</a> to go back to the home page!</h2>
            </div>
        </div>
    )
}