import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';

import './style.scss';

import * as Actions from '../../actions';
import UsersList from '../../components/UsersList';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import { StoriesIcon, PhotosIcon } from '../../components/Navbar/Icons';

class Users extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { fetchUsers, loggedIn } = this.props;
    this.setState({ loading: true });
    const isAborted = await fetchUsers({ loggedIn, signal: this.abortController.signal });
    if (isAborted === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { users } = this.props;

    if (loading)
      return (
        <div className="users-page">
          <SpinnerLoader />
        </div>
      );

    if (users.error && users.error.status === 500) return <Error500 />;

    return (
      <div className="users-page page">
        <Helmet>
          <title>Dashboard | PentasticMe</title>
        </Helmet>
        <h2 className="dashboard-heading">
          <div className="header-div">Dashboard</div>
        </h2>
        <div className="counter-container">
          <div className="stories-count">
            <StoriesIcon />
            <CountUp
              className="p-0 m-0 d-block"
              start={0}
              end={users.storiesCount}
              style={{ fontSize: '2.5em', lineHeight: '1em' }}
            />
            <div className="font-weight-bold counter-description">Stories Posted</div>
          </div>
          <div className="photos-count">
            <PhotosIcon />
            <CountUp
              className="p-0 m-0 d-block"
              start={0}
              end={users.photosCount}
              style={{ fontSize: '2.5em', lineHeight: '1em' }}
            />
            <div className="font-weight-bold counter-description">Photos Uploaded</div>
          </div>
        </div>
        <h2 className="dashboard-heading">
          <div className="header-div">Mangage Roles</div>
        </h2>
        {users.error ? <ErrorMessage message={users.error.message} /> : null}
        <div className="table-container">
          <UsersList users={users.data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth }) => ({
  users,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: payload => dispatch(Actions.fetchUsers(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
