import React from 'react';
import { Carousel } from 'react-bootstrap';

const PhotoCarousel = ({ url }) => (
  <Carousel.Item>
    <img className="d-block w-100" src={url} />
  </Carousel.Item>
);

export default PhotoCarousel;
