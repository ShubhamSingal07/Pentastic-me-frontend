import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import LikeHeart from '../../LikeHeart';
import CommentIcon from '../../CommentIcon';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PhotoLoadingAnimation = () => (
  <div className="loading-photo-container row">
    <Helmet>
      <title>Photos | PentasticMe</title>
    </Helmet>
    {arr.map(val => (
      <div className="loading-photo col-12 col-sm-6 col-md-4" key={val}>
        <div className="loading-img-container" />
        <div className="loading-like-container">
          <LikeHeart loading={true} />
          <CommentIcon />
        </div>
      </div>
    ))}
  </div>
);

export default PhotoLoadingAnimation;
