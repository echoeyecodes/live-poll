import React from "react";
import Modal from "react-bootstrap/Modal";
const AlertModal = props => {
  const dismiss = () => {
    props.handleShowModalFail();
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
          <h2 style={{color: 'black'}}>Error</h2>
          <p style={{color: 'black'}}>{props.msg}</p>
          <button
            style={{
                backgroundColor: "#db3236",
                padding: "5px",
                borderRadius: "5px",
                border: 'none',
                color:'white'
              }}
            onClick={e => {
              e.preventDefault();
              dismiss();
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
