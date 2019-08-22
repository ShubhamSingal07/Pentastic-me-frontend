import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import StoriesList from '../../components/StoriesList';
import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';

class Home extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { login, fetchHomePage, loggedIn } = this.props;
    const userid = this.props.location.search.substring(4);

    if (userid) {
      console.log('printing', userid);
      // this.props.history.push('/');
      <Redirect to="/" />;
      login(userid);
    }
    this.setState({ loading: true });
    fetchHomePage({ loggedIn });
    this.setState({ loading: false });
  }

  render() {
    if (loading) return <div>Loading</div>;
    if (stories.error || photos.error) return <div>stories.error</div>;
    return (
      <div>
        <Navbar />
        <StoriesList stories={stories.data} />
        <PhotosList photos={photos.data} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, stories, photos }) => ({
  loggedIn: auth.loggedIn,
  stories,
  photos,
});

const mapDispatchToProps = dispatch => ({
  login: id => dispatch(Actions.login(id)),
  fetchHomePage: payload => dispatch(Actions.fetchHomePage(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
