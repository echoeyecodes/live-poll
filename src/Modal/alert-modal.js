import React from 'react'
import './styles/alert-modal-styles.css'
const AlertModal = (props) =>{

    const done= ()=>{
        props.handleShowModal()
    }
    return(
        <div className='alert-modal-root alert-modal-common'>
            <div>
                <h2>Successful</h2>
                <img src='' />
                <p>{props.msg}</p>
                <button style={{backgroundColor: '#3cba54'}} onClick={(e) =>{
                    e.preventDefault()
                    done()
                }}>Okay</button>
            </div>
        </div>
    )
}

export default AlertModal