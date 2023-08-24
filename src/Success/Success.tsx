import './Success.css'
import joie_pike from '../assets/joie-pikachu.gif'
import { useEffect, useState } from 'react'
import { env } from '../env.config.js'
import userStore from '../userStore'
import Social from '../Social/Social'

export default function Success() {
    const userInfo = userStore()
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        setCode(window.location.href.split('=')[1])
    }, [])

    useEffect(() => {
        if(code !== null) {
        console.log({"client_id": env.client_id,
            "client_secret": env.client_secret,
            "grant-type": 'authorization_code',
            'code': code,
            'redirect_uri': env.generated_url})
        fetch('https://discord.com/api/v10', {
            method: "POST",
            body: {
                //@ts-ignore
                "client_id": env.client_id,
                "client_secret": env.client_secret,
                "grant-type": 'authorization_code',
                'code': code,
                'redirect_uri': env.generated_url
            },
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(info => {
            console.log(info)
        }))
        }
        
    }, [code])

    return (
        <div className="success">
            <Social/>
            <div className="sMain">

                <h1>Integration with discord completed successfully!</h1>
                <img src={joie_pike} alt='pikachu running'/>
                <h2 style={{marginTop: '10px'}}>Click <a href='http://localhost:3000/'>here</a> to go back to the home page!</h2>
            </div>
        </div>
    )
}