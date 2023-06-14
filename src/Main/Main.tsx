import './Main.css'
import Header from "../Header/Header";
import Body from '../Body/Body';

export default function Main(props: {name : string}) {
    return (
    <div className="main">
        <Header/>
        <Body name={props.name}/>
    </div>
    )
}