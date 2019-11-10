import React from 'react';

import PhotosItem from './PhotosItem';

const PhotosList = ({ photos }) => (
  <div>
    {photos.length === 0 ? (
      <div className="alert alert-warning">No photo has been uploaded by admin</div>
    ) : (
      <div className="container-fluid row">
        {photos.map((photo, index) => (
          <PhotosItem photo={photo} key={photo._id} index={index} />
        ))}
      </div>
    )}
  </div>
);

export default PhotosList;
