import React from 'react'
import './styles/add-option-button.css'
const AddOptionButton = (props) =>{
    return (
        <button onClick={props.onAdd} id='add-option-button'>
            ADD OPTION
        </button>
    )
}

export default AddOptionButton