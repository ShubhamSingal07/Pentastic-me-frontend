import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';

const DraftsLoader = () => (
  <div className="loading-draft-container row">
    <Helmet>
      <title>Drafts | PentasticMe</title>
    </Helmet>
    <div className="loading-draft col-12">
      <div className="loading-height1" />
      <div className="loading-width1" />
    </div>
    <div className="loading-draft col-12">
      <div className="loading-height1" />
      <div className="loading-width1" />
    </div>
    <div className="loading-draft col-12">
      <div className="loading-height1" />
      <div className="loading-width1" />
    </div>
    <div className="loading-draft col-12">
      <div className="loading-height1" />
      <div className="loading-width1" />
    </div>
  </div>
);

export default DraftsLoader;
