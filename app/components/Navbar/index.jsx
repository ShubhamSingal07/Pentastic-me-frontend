import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './style.scss';

import * as Actions from '../../actions';
import Hamburger from '../Hamburger';
import {
  HomeIcon,
  StoriesIcon,
  PhotosIcon,
  DraftsIcon,
  BookmarksIcon,
  WriteIcon,
  UploadIcon,
  DashboardIcon,
  AboutIcon,
  ContactIcon,
  LoginIcon,
  LogoutIcon,
} from './Icons';

const OAUTH_URL = process.env.OAUTH_URL;

class NavbarComponent extends React.Component {
  state = {
    className: '',
    activeClassName: '',
  };

  componentDidMount() {
    this.checkActiveTab();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) this.checkActiveTab();
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
    return (window.location.href = `${OAUTH_URL}/logout`);
  };

  handleLogin = () => {
    return (window.location.href = OAUTH_URL);
  };

  navToggler = () => {
    const { className } = this.state;
    if (className === '') {
      this.setState({ className: 'open' });
    } else {
      this.setState({ className: '' });
    }
  };

  checkActiveTab = () => {
    const { location } = this.props;
    if (location.pathname === '/') return this.setState({ activeClassName: 'Home' });
    if (location.pathname.startsWith('/stories/page/')) return this.setState({ activeClassName: 'Stories' });
    if (location.pathname.startsWith('/photos/page/')) return this.setState({ activeClassName: 'Photos' });
    if (location.pathname === '/drafts') return this.setState({ activeClassName: 'Drafts' });
    if (location.pathname === '/bookmarks') return this.setState({ activeClassName: 'Bookmarks' });
    if (location.pathname === '/stories/write') return this.setState({ activeClassName: 'Write' });
    if (location.pathname === '/photos/upload') return this.setState({ activeClassName: 'Upload' });
    if (location.pathname === '/dashboard') return this.setState({ activeClassName: 'Dashboard' });
    if (location.pathname === '/about') return this.setState({ activeClassName: 'About' });
    if (location.pathname === '/contact') return this.setState({ activeClassName: 'Contact' });
    this.setState({ activeClassName: '' });
  };

  render() {
    const { className, activeClassName } = this.state;
    const { loggedIn, role } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-sm-start fixed-top p-0 pl-2">
          <Link className="navbar-brand mt-1 m-0 pl-2" to="/">
            PentasticMe
          </Link>
          <button className="navbar-toggler align-self-start ml-auto p-0" type="button" onClick={this.navToggler}>
            <Hamburger classnameToggler={this.navToggler} className={className} />
          </button>
          <div
            className={`collapse navbar-collapse bg-light p-lg-0 mt-lg-0 d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end mobileMenu ${className}`}
            id="navbarSupportedContent">
            <ul className="navbar-nav align-self-stretch m-0">
              <li className={`nav-item ${activeClassName === 'Home' ? 'active' : ''}`}>
                <Link className="nav-link" to="/">
                  <HomeIcon />
                  Home
                </Link>
              </li>

              <li className={`nav-item ${activeClassName === 'Stories' ? 'active' : ''}`}>
                <Link className="nav-link" to="/stories/page/1">
                  <StoriesIcon />
                  Stories
                </Link>
              </li>

              <li className={`nav-item ${activeClassName === 'Photos' ? 'active' : ''}`}>
                <Link className="nav-link" to="/photos/page/1">
                  <PhotosIcon />
                  Photos
                </Link>
              </li>

              <li className="nav-item dropdown" id="desktopOnly">
                <DropdownButton id="menuBtn" alignRight title="Menu">
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link className={`dropdown-link ${activeClassName === 'Drafts' ? 'active' : ''}`} to="/drafts">
                        <DraftsIcon />
                        Drafts
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  <Dropdown.Item as="div">
                    <Link
                      className={`dropdown-link ${activeClassName === 'Bookmarks' ? 'active' : ''}`}
                      to="/bookmarks">
                      <BookmarksIcon />
                      Bookmarks
                    </Link>
                  </Dropdown.Item>
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link
                        className={`dropdown-link ${activeClassName === 'Write' ? 'active' : ''}`}
                        to="/stories/write">
                        <WriteIcon />
                        Write
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link
                        className={`dropdown-link ${activeClassName === 'Upload' ? 'active' : ''}`}
                        to="/photos/upload">
                        <UploadIcon />
                        Upload
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  {role === 'Admin' ? (
                    <Dropdown.Item as="div">
                      <Link
                        className={`dropdown-link ${activeClassName === 'Dashboard' ? 'active' : ''}`}
                        to="/dashboard">
                        <DashboardIcon />
                        Dashboard
                      </Link>
                    </Dropdown.Item>
                  ) : null}
                  <Dropdown.Item as="div">
                    <Link className={`dropdown-link ${activeClassName === 'About' ? 'active' : ''}`} to="/about">
                      <AboutIcon />
                      About
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link className={`dropdown-link ${activeClassName === 'Contact' ? 'active' : ''}`} to="/contact">
                      <ContactIcon />
                      Contact
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as="div">
                    {loggedIn ? (
                      <button className="dropdown-link" onClick={this.handleLogout}>
                        <LogoutIcon />
                        Sign out
                      </button>
                    ) : (
                      <button className="dropdown-link" onClick={this.handleLogin}>
                        <LoginIcon />
                        Login
                      </button>
                    )}
                  </Dropdown.Item>
                </DropdownButton>
              </li>

              {role === 'Admin' ? (
                <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Drafts' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/drafts">
                    <DraftsIcon />
                    Drafts
                  </Link>
                </li>
              ) : null}

              <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Bookmarks' ? 'active' : ''}`}>
                <Link className="nav-link" to="/bookmarks">
                  <BookmarksIcon />
                  Bookmarks
                </Link>
              </li>

              {role === 'Admin' ? (
                <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Write' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/stories/write">
                    <WriteIcon />
                    Write
                  </Link>
                </li>
              ) : null}

              {role === 'Admin' ? (
                <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Upload' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/photos/upload">
                    <UploadIcon />
                    Upload
                  </Link>
                </li>
              ) : null}

              {role === 'Admin' ? (
                <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Dashboard' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/dashboard">
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>
              ) : null}

              <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'About' ? 'active' : ''}`}>
                <Link className="nav-link" to="/about">
                  <AboutIcon />
                  About
                </Link>
              </li>

              <li className={`nav-item mobileOnly pl-1 ${activeClassName === 'Contact' ? 'active' : ''}`}>
                <Link className="nav-link" to="/contact">
                  <ContactIcon />
                  Contact
                </Link>
              </li>
              <li className="nav-item mobileOnly">
                {loggedIn ? (
                  <button className="nav-link" onClick={this.handleLogout}>
                    <LogoutIcon />
                    Sign out
                  </button>
                ) : (
                  <button className="nav-link" onClick={this.handleLogin}>
                    <LoginIcon />
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavbarComponent),
);
