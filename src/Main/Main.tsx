import './Main.css';
import '../style.css'
import {
    ReactNode
} from 'react'
import Social from '../Social/Social';

export default function Main(props: {component: ReactNode}) {
    return(
        <div className="main">
            <Social/>
            {props.component}
        </div>
    )
}