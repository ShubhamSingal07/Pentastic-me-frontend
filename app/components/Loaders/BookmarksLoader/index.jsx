import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';

const BookmarksLoader = () => (
  <div className="loading-bookmark-container row">
    <Helmet>
      <title>Bookmarks | PentasticMe</title>
    </Helmet>
    <div className="loading-bookmark col-12 col-sm-12 d-flex flex-column flex-sm-column flex-md-row">
      <div className="loading-img-container" />
      <div className="loading-details-container">
        <div className="loading-height1" />
        <div className="loading-height2-container">
          <div className="loading-height2" />
          <div className="loading-height2" />
        </div>
      </div>
    </div>
    <div className="loading-bookmark col-12 col-sm-12 d-flex flex-column flex-sm-column flex-md-row">
      <div className="loading-img-container" />
      <div className="loading-details-container">
        <div className="loading-height1" />
        <div className="loading-height2-container">
          <div className="loading-height2" />
          <div className="loading-height2" />
        </div>
      </div>
    </div>
    <div className="loading-bookmark col-12 col-sm-12 d-flex flex-column flex-sm-column flex-md-row">
      <div className="loading-img-container" />
      <div className="loading-details-container">
        <div className="loading-height1" />
        <div className="loading-height2-container">
          <div className="loading-height2" />
          <div className="loading-height2" />
        </div>
      </div>
    </div>
  </div>
);

export default BookmarksLoader;
