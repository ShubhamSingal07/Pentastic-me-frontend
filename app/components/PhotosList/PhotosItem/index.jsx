import React from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const PhotosItem = ({ photo }) => {
  handleClick = () => {
    <Redirect to={`/photos/${photo.id}`} />;
  };

  return (
    <div onClick={handleClick}>
      {photo.url.length == 1 ? (
        <img src={photo.url[0]} />
      ) : (
        <Carousel>
          {photo.url.map(url => (
            <PhotoCarousel url={url} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PhotosItem;
