import React from 'react';

import PhotosItem from './PhotosItem';

const PhotosList = ({ photos }) => (
  <div>
    <h1>Photos</h1>
    {photos.length === 0 ? (
      <div>No photo has been uploaded by admin</div>
    ) : (
      <div>
        {photos.map(photo => (
          <PhotosItem photo={photo} key={photo.id} />
        ))}
      </div>
    )}
  </div>
);

export default PhotosList;
