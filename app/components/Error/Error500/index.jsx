import React from 'react';

import './style.scss';

const Error500 = ({ message }) => (
  <div className="error-500-container">
    <div className="error-500">
      <h1>500</h1>
      <p className="error-desc">internal server error</p>
      <p className="tagline">
        Problem. <br />
        Looks like something went wrong with our servers.
        <br />
        Our Pentastic developers are working on the issue.
        <br />
      </p>
    </div>

    <div className="signature-sep">--</div>

    <p className="signature">
      Your Pal -<span className="signature-name">Pentastic Me</span>
    </p>
  </div>
);

export default Error500;
