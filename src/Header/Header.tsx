import './Header.css'
import '../style.css'
import logo from '../assets/logo_umbreon.png';

export default function Header() {
    return (
        <header>
                <img src={logo} alt='pokedle' className='logo'/>
                <h1>Pokedle</h1>
        </header>
    )
}