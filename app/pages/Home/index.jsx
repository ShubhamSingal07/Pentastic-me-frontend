import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import StoriesList from '../../components/StoriesList';
import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';
import StoryLoader from '../../components/Loaders/StoryLoader';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

class Home extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { login, fetchHomePage, loggedIn } = this.props;
    const userid = this.props.location.search.substring(4);
    if (userid) {
      this.props.history.push('/');
      this.setState({ loading: true });
      const isAborted1 = await login(userid, this.abortController.signal);
      if (isAborted1 === true) return;
      const isAborted2 = await fetchHomePage({ loggedIn, signal: this.abortController.signal });
      if (isAborted2 === true) return;
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      const isAborted = await fetchHomePage({ loggedIn, signal: this.abortController.signal });
      if (isAborted === true) return;
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { stories, photos } = this.props;

    if (loading) return <StoryLoader />;

    if ((stories.error && stories.error.status === 500) || (photos.error && photos.error.status === 500))
      return <Error500 message={stories.error.message || photos.error.message} />;

    return (
      <div className="home-page page">
        <Helmet>
          <title>Home | PentasticMe</title>
        </Helmet>
        {photos.error ? <ErrorMessage message={photos.error.message} /> : null}
        <h1 className="home-heading pt-3">
          <div className="header-div">Stories</div>
        </h1>
        <StoriesList stories={stories.data} />
        <h1 className="home-heading">
          <div className="header-div mb-3">Photos</div>
        </h1>
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
