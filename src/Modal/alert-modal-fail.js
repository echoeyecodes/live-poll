import React from 'react'
import './styles/alert-modal-styles.css'
const AlertModal = (props) =>{

    const dismiss= ()=>{
        props.handleShowModalFail()
    }
    return(
        <div className='alert-modal-root alert-modal-common'>
            <div>
                <h2>Error</h2>
                <img src='' />
                <p>{props.msg}</p>
                <button style={{backgroundColor: '#db3236'}} onClick={(e) =>{
                    e.preventDefault()
                    dismiss()
                }}>Okay</button>
            </div>
        </div>
    )
}

export default AlertModal