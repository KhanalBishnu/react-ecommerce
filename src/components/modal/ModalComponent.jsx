import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
function ModalComponent({showModal,handleCloseModal,modalBody,loading, header}) {
  return (
    // <div className='container-fluid '  > 
    <div className="row" >
      
          <Modal style={{zIndex:"99999999999999"}} show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton onClick={handleCloseModal}>
              <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {modalBody}
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" className={`btn px-2 ${loading ? 'btn-success' : 'btn-primary'}`} >
              {loading ? 'Submiting...' : 'Submit'}
              </Button>
            </Modal.Footer> */}
          </Modal>
    </div>
    // </div>
  )
}

export default ModalComponent