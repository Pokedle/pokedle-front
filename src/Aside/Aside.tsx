import './Aside.css'
import HouseIcon from '@mui/icons-material/House';
import GroupIcon from '@mui/icons-material/Group';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function Aside() {
    return ( 
        <aside>
            <ul>
                <a href="/">
                    <li><HouseIcon className="icon"/></li>
                </a>
                <a href="">
                    <li><GroupIcon className="icon"/></li>
                </a>
                <a href="/challenges">
                    <li><WhatshotIcon className="icon"/></li>
                </a>
            </ul>
            
            
            
        </aside> 
    );
}