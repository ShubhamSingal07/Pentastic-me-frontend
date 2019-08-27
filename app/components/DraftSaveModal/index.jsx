import React from 'react';
import { Modal } from 'react-bootstrap';

const DraftSaveModal = ({ titleChange, show, onHide, handleClick, title }) => (
  <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Save Draft</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <input type="text" value={title} onChange={titleChange} value={title} />
        <span data-placeholder="Title" />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <button onClick={handleClick}>Close</button>
    </Modal.Footer>
  </Modal>
);

export default DraftSaveModal;