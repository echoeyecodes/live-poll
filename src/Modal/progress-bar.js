import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
const ProgressBar = (props) =>{
    return(
        <Modal
        show
        size="sm"
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>
        <Spinner style={{color: 'black'}} animation="border" role="status">
  <p  style={{color: 'black'}} className="sr-only">Loading...</p>
</Spinner>
        </Modal.Body>
      </Modal>
    )
}



export default ProgressBar