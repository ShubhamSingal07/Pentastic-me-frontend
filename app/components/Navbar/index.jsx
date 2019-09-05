import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import * as Actions from '../../actions';
import Hamburger from '../Hamburger';

import './style.scss';

class NavbarComponent extends React.Component {
  state = {
    className: '',
  };

  navToggler = () => {
    const { className } = this.state;
    if (className === '') {
      this.setState({ className: 'open' });
    } else {
      this.setState({ className: '' });
    }
  };

  handleLogin = () => {
    return (window.location.href = 'http://localhost:5000');
  };

  handleLogout = () => {
    const { logout } = this.props;
    logout();
    return (window.location.href = 'http://localhost:5000/logout');
  };

  render() {
    const { className } = this.state;
    const { loggedIn, role } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start fixed-top p-1 pl-2">
          <Link className="navbar-brand" to="/">
            PentasticMe
          </Link>
          <button className="navbar-toggler align-self-start ml-auto p-0" type="button" onClick={this.navToggler}>
            <Hamburger classnameToggler={this.navToggler} className={className} />
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
                <Link className="nav-link" to="/stories/page/0">
                  Stories
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/photos/page/0">
                  Photos
                </Link>
              </li>

              <li className="nav-item dropdown" id="desktopOnly">
                <DropdownButton alignRight title="Menu">
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link className="dropdown-link" to="/drafts">
                        Drafts
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  <Dropdown.Item as="div">
                    <Link className="dropdown-link" to="/bookmarks">
                      Bookmarks
                    </Link>
                  </Dropdown.Item>
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link className="dropdown-link" to="/stories/write">
                        Write
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link className="dropdown-link" to="/photos/upload">
                        Upload
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  <Dropdown.Item as="div">
                    <Link className="dropdown-link" to="/about">
                      About
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link className="dropdown-link" to="/contact">
                      Contact
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as="div">
                    {loggedIn ? (
                      <button className="dropdown-link" onClick={this.handleLogout}>
                        Sign out
                      </button>
                    ) : (
                      <button className="dropdown-link" onClick={this.handleLogin}>
                        Login
                      </button>
                    )}
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              {role === 'Admin' ? (
                <li className="nav-item mobileOnly">
                  <Link className="nav-link" to="/drafts">
                    Drafts
                  </Link>
                </li>
              ) : null}

              <li className="nav-item mobileOnly">
                <Link className="nav-link" to="/bookmarks">
                  Bookmarks
                </Link>
              </li>

              {role === 'Admin' ? (
                <li className="nav-item mobileOnly">
                  <Link className="nav-link" to="/stories/write">
                    Write
                  </Link>
                </li>
              ) : null}

              {role === 'Admin' ? (
                <li className="nav-item mobileOnly">
                  <Link className="nav-link" to="/photos/upload">
                    Upload
                  </Link>
                </li>
              ) : null}

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
                {loggedIn ? (
                  <button className="nav-link" onClick={this.handleLogout}>
                    Sign out
                  </button>
                ) : (
                  <button className="nav-link" onClick={this.handleLogin}>
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
        <div className={`overlay ${className}`} onClick={this.navToggler} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  loggedIn: auth.loggedIn,
  role: user.data.role,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Actions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarComponent);
