import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import './styles/progress-bar.css'
const ProgressBar = () =>{
    return(
        <div className='progress-modal-root'>
            <Spinner style={{color: 'white'}} animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
        </div>
    )
}



export default ProgressBar