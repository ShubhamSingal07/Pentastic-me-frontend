import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Footer = () => (
  <div className="footer text-white bg-dark d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row">
    <div className="author-details col-12 col-sm-6 text-center">
      <div style={{ fontSize: '1.5em' }}>Follow Dipanshu</div>
    </div>
    <div className="developer-details col-12 col-sm-6 text-center">
      <div style={{ fontSize: '1.5em' }}>About the Developer</div>
      <div>Shubham Singal</div>
      <div>
        <Link>
          <i class="fab fa-instagram" />
        </Link>
        <Link>
          <i class="fab fa-facebook" />
        </Link>
        <Link>
          <i class="fab fa-github" />
        </Link>
        <Link>
          <i class="fab fa-linkedin" />
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
