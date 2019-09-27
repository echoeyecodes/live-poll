import React from "react";
import Modal from "react-bootstrap/Modal";
const AlertModal = props => {
  const done = () => {
    props.handleShowModal();
  };
  return (
    <Modal
      show
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Body>
        <div>
          <h2 style={{color: 'black'}}>Successful</h2>
          <p style={{color: 'black'}}>{props.msg}</p>
          <button
            style={{
              backgroundColor: "#3cba54",
              padding: "5px",
              borderRadius: "5px",
              border: 'none',
              color:'white'
            }}
            onClick={e => {
              e.preventDefault();
              done();
            }}
          >
            Okay
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
