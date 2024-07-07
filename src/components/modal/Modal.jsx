import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
function Modal({showModal,handleCloseModal,modalBody,handleSubmit}) {
  return (
    <div>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {modalBody}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" className={`btn px-2 ${btnSpinner ? 'btn-success' : 'btn-primary'}`}  onClick={handleuserManagementForm}>
              {btnSpinner ? 'Submiting...' : 'Submit'}
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default Modal