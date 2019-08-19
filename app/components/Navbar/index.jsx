import React from 'react';

import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Hamburger from '../Hamburger';

import './style.scss';

const NavbarComponent = () => {
  const [className, setClassName] = React.useState('');

  const navToggler = () => {
    if (className === '') {
      setClassName('open');
    } else {
      setClassName('');
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start fixed-top p-1 pl-2">
        <Link className="navbar-brand" to="/">
          PentasticMe
        </Link>
        <button className="navbar-toggler align-self-start ml-auto p-0" type="button" onClick={navToggler}>
          <Hamburger />
        </button>
        <div
          className={`collapse navbar-collapse bg-dark p-3 p-lg-0 mt-lg-0 d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end mobileMenu ${className}`}
          id="navbarSupportedContent">
          <ul className="navbar-nav align-self-stretch">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stories">
                Stories
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/photos">
                Photos
              </Link>
            </li>

            <li className="nav-item dropdown" id="desktopOnly">
              <DropdownButton alignRight title="Menu">
                <Dropdown.Item>
                  <Link className="dropdown-link" to="/drafts">
                    Drafts
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link className="dropdown-link" to="/favourites">
                    Favourites
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link className="dropdown-link" to="/about">
                    About
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link className="dropdown-link" to="/contact">
                    Contact
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link className="dropdown-link" to="/logout">
                    Sign out
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </li>

            <li className="nav-item mobileOnly">
              <Link className="nav-link" to="/drafts">
                Drafts
              </Link>
            </li>

            <li className="nav-item mobileOnly">
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
            </li>

            <li className="nav-item mobileOnly">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item mobileOnly">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item mobileOnly">
              <Link className="nav-link" to="/logout">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`overlay ${className}`} onClick={navToggler} />
    </React.Fragment>
  );
};

export default NavbarComponent;
