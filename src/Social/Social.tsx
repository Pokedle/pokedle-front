/* eslint-disable jsx-a11y/anchor-has-content */
import '../style.css'
import userStore from '../userStore'
import './Social.css'
import emptyUser from '../assets/user.png'
import { env } from '../env.config.js'
import { 
    useState,
    useRef,
    useEffect
 } from 'react'
import arrow from '../assets/1_arrow.png'

export default function Social() {
    const user = userStore();
    const [open, setOpen] = useState<boolean>(false);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const fixSocialWidth = (): string => {
        if(windowSize.current[0] >= 1000) {
            return '30vw';
        }
        else {
            return '100vw';
        }
    }

    const fixSocialPosition = (): string => {
        if (windowSize.current[0] >= 1000) {
            if(open) {
                return '15%';
            } else {
                return "-10%"
            }
        } else {
            if(open) {
                return '50%'
            } else {
                return '-33%'
            }
        }
    }

    return (
        <div className='social' style={{left: fixSocialPosition(), width: fixSocialWidth()}}>
            {
            user.username === "" ? 
            <div className='socialContent'>
                <img src={emptyUser} alt='Foto de perfil vazia...' className='user'/>
                <a href={env.generated_url}>Login</a>

                <div className='socialNav' onClick={() => setOpen(!open)}>
                    <img src={arrow} alt='seta' style={{rotate: open ? '90deg': '-90deg'}} className='arrow'/>
                </div>
            </div>
            :
            <div className='socialContent'>


                <div className='socialNav' onClick={() => setOpen(!open)}>
                    <img src={arrow} alt='seta' style={{rotate: open ? '90deg': '-90deg'}} className='arrow'/>
                </div>
            </div>
            }
            
        </div>
    )
}