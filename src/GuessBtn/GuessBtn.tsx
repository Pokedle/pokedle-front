import { useState } from 'react'
import GuessBtnI from '../../interfaces/GuessBtn'
import './GuessBtn.css'


export default function GuessBtn({attrName, attrValue} : GuessBtnI) {
    return (
        <div className='ball'>
            {attrName}
        </div>
    )
}