import React from 'react';

import './style.scss';

const SpinnerLoader = () => (
  <div className="circle-loader">
    <div className="circle color1" />
    <div className="circle color2" />
    <div className="circle color3" />
    <div className="circle color4" />
    <div className="circle color5" />
  </div>
);

export default SpinnerLoader;
