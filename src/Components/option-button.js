import React from 'react'
import './styles/option-button.css'
const OptionButton = (props) =>{
    
    const handleSendOption =() =>{
        props.setOption(props.value)
    }
    return (
        <button onClick={handleSendOption} className='option-button'>
            {props.value}
        </button>
    )
}

export default OptionButton