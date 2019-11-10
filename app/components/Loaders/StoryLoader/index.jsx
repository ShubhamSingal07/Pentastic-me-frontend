import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';

const StoryLoadingAnimation = () => (
  <div className="loading-story-container row">
    <Helmet>
      <title>Stories | PentasticMe</title>
    </Helmet>
    <div className="loading-story first d-flex col-md-12 col-sm-6 col-12 flex-column flex-sm-column flex-md-row">
      <div className="loading-img-container" />
      <div className="loading-details">
        <div className="height1" />
        <div className="height2" />
        <span className="height3-container">
          <div className="height3" />
          <div className="height3" />
          <div className="height3" />
        </span>
      </div>
    </div>
    <div className="loading-story second d-flex col-sm-6 col-12 flex-column">
      <div className="loading-img-container" />
      <div className="loading-details">
        <div className="height1" />
        <div className="height2" />
        <span className="height3-container">
          <div className="height3" />
          <div className="height3" />
          <div className="height3" />
        </span>
      </div>
    </div>
    <div className="loading-story second d-flex col-sm-6 col-12 flex-column">
      <div className="loading-img-container" />
      <div className="loading-details">
        <div className="height1" />
        <div className="height2" />
        <span className="height3-container">
          <div className="height3" />
          <div className="height3" />
          <div className="height3" />
        </span>
      </div>
    </div>
    <div className="loading-story first d-flex col-md-12 col-sm-6 col-12  flex-column flex-sm-column flex-md-row">
      <div className="loading-img-container" />
      <div className="loading-details">
        <div className="height1" />
        <div className="height2" />
        <span className="height3-container">
          <div className="height3" />
          <div className="height3" />
          <div className="height3" />
        </span>
      </div>
    </div>
  </div>
);

export default StoryLoadingAnimation;
