import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const DraftSaveModal = ({ titleChange, show, onHide, handleClick, title, page }) => {
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (title && title.trim().length > 0) setClassName('focus');
  }, [title]);

  const handleBlur = e => {
    if (e.target.value === '') {
      setClassName('');
    }
  };

  const handleFocus = () => {
    setClassName('focus');
  };

  let ref;

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{page ? 'Edit' : 'Save to Drafts'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="txtb">
          <input
            type="text"
            ref={e => (ref = e)}
            value={title}
            onChange={titleChange}
            className={`${className} input`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <span data-placeholder="Title" onClick={() => ref.focus()} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-success btn-dark-green" onClick={handleClick}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DraftSaveModal;
