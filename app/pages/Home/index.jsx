import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import StoriesList from '../../components/StoriesList';
import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';

class Home extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { login, fetchHomePage, loggedIn } = this.props;
    const userid = this.props.location.search.substring(4);

    if (userid) {
      this.props.history.push('/');
      this.setState({ loading: true });
      await login(userid);
      await fetchHomePage({ loggedIn });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await fetchHomePage({ loggedIn });
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { stories, photos } = this.props;

    if (loading) return <div className="home-page">Loading</div>;
    if (stories.error || photos.error) return <div className="home-page">{stories.error}</div>;
    return (
      <div className="home-page">
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
