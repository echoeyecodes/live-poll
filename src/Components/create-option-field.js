import React from 'react'
const CreateOptionButton = (props) =>{
    const handleOnInput =(evt) =>{
        props.onInput(props.index, {
            value: evt.target.value,
            users: []
        })
    }
    return(
        <input onChange={handleOnInput} style={{padding: '10px', borderRadius: '5px', border: 'none', margin: '5px'}} type='text' placeholder={`Option ${props.index + 1}`}/>
    )
}

export default CreateOptionButton