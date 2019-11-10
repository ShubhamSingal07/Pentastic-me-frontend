import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

import * as Actions from '../../actions';

const ImageDeleteIcon = ({ index, deleteImage, isPublishModal, handleUploadImage }) => {
  const handleDeleteImage = () => {
    if (isPublishModal) handleUploadImage();
    deleteImage({ index });
  };

  return (
    <span className="image-delete-icon" onClick={handleDeleteImage}>
      <i className="fas fa-minus-circle " />
    </span>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteImage: payload => dispatch(Actions.deleteImage(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ImageDeleteIcon);
