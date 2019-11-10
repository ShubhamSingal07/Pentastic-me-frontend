import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload';

import './style.scss';

import ErrorMessage from '../Error/ErrorMessage';

class PublishModal extends React.Component {
  state = {
    titleClassName: '',
    descriptionClassName: '',
  };

  componentDidMount() {
    const { title, description } = this.props;
    if (title && description && title.trim().length > 0 && description.trim().length > 0)
      this.setState({ titleClassName: 'focus', descriptionClassName: 'focus' });
    else if (title && title.trim().length > 0) this.setState({ titleClassName: 'focus' });
    else if (description && description.trim().length > 0) this.setState({ descriptionClassName: 'focus' });
  }

  componentDidUpdate(prevProps) {
    const { title, description } = this.props;
    if (prevProps.title !== title || prevProps.description !== description) {
      if (title && description && title.trim().length > 0 && description.trim().length > 0)
        this.setState({
          titleClassName: 'focus',
          descriptionClassName: 'focus',
        });
      else if (title && title.trim().length > 0) this.setState({ titleClassName: 'focus' });
      else if (description && description.trim().length > 0) this.setState({ descriptionClassName: 'focus' });
    }
  }

  handleBlur = e => {
    if (e.target.value === '') {
      this.setState({
        [e.target.name]: '',
      });
    }
  };

  handleFocus = e => {
    this.setState({
      [e.target.name]: 'focus',
    });
  };

  render() {
    const { titleClassName, descriptionClassName } = this.state;
    const { titleChange, show, onHide, handleClick, title, description, descriptionChange, images } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Publish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="publish-modal-container">
            {images.error ? <ErrorMessage message={images.error} /> : null}
            <div className="txtb">
              <input
                type="text"
                name="titleClassName"
                ref={e => (this.titleRef = e)}
                value={title}
                onChange={titleChange}
                className={`${titleClassName} input`}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                required
              />
              <span data-placeholder="Title" onClick={() => this.titleRef.focus()} />
            </div>
            <div className="txtb">
              <textarea
                ref={e => (this.descriptionRef = e)}
                value={description}
                name="descriptionClassName"
                className={`${descriptionClassName} input description-input`}
                onChange={descriptionChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                required
              />
              <span data-placeholder="Description" onClick={() => this.descriptionRef.focus()} />
            </div>
          </div>
          <ImageUpload isPublishModal={true} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-primary btn-blue-grey" onClick={handleClick}>
            Publish
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ images }) => ({
  images,
});

export default connect(mapStateToProps)(PublishModal);
