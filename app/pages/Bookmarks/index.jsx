import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import StoriesList from '../../components/StoriesList';
import BookmarksLoader from '../../components/Loaders/BookmarksLoader';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

class Bookmarks extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentWillMount() {
    const { fetchBookmarks, loggedIn } = this.props;
    this.setState({ loading: true });
    const isAborted = await fetchBookmarks({ loggedIn, signal: this.abortController.signal });
    if (isAborted) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { bookmarks, loggedIn } = this.props;
    if (loading) return <BookmarksLoader />;
    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);
    if (bookmarks.error && bookmarks.error.status === 500) return <Error500 message={bookmarks.error.message} />;

    return (
      <div className="bookmarks-page page">
        <Helmet>
          <title>Bookmarks | PentasticMe</title>
        </Helmet>
        <h2 className="bookmarks-heading pt-3">
          <div className="header-div">Bookmarks</div>
        </h2>
        {bookmarks.error ? <ErrorMessage message={bookmarks.error.message} /> : null}
        <StoriesList stories={bookmarks.data} bookmarkPage={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ bookmarks, auth }) => ({
  bookmarks,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchBookmarks: payload => dispatch(Actions.fetchBookmarks(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
