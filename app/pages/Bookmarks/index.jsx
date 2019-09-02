import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import StoriesList from '../../components/StoriesList';

class Bookmarks extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { fetchBookmarks, loggedIn } = this.props;
    this.setState({ loading: true });
    await fetchBookmarks({ loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { bookmarks } = this.props;

    return (
      <div className="bookmarks-page">
        <h2>Bookmarks</h2>
        {loading ? (
          <div>Loading</div>
        ) : bookmarks.error ? (
          <div>{bookmarks.error}</div>
        ) : (
          <StoriesList stories={bookmarks.data} bookmarkPage={true} />
        )}
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
