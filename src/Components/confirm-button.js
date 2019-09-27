import React from 'react'
import './styles/confirm-button.css'
const ConfirmButton = (props) =>{
    return (
        <button onClick={props.send} id='confirm-button'>
            DONE
        </button>
    )
}

export default ConfirmButton