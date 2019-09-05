import React from 'react';
import { Modal } from 'react-bootstrap';
import ImageUpload from '../ImageUpload';

class PublishModal extends React.Component {
  render() {
    const { titleChange, imageChange, show, onHide, handleClick, title } = this.props;

    return (
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Publish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" value={title} onChange={titleChange} value={title} />
            <span data-placeholder="Title" />
          </div>
          <ImageUpload isPublishModal={true} imageChange={imageChange} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClick}>Publish</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PublishModal;
