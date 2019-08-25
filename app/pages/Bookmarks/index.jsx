import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import Navbar from '../../components/Navbar';
import StoriesList from '../../components/StoriesList';

class Bookmarks extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { fetchBookmarks } = this.props;
    this.setState({ loading: true });
    fetchBookmarks();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { bookmarks } = this.props;

    if (loading) return <div>Loading</div>;

    if (bookmarks.error) return <div>{bookmarks.error}</div>;

    return (
      <div>
        <Navbar />
        <StoriesList stories={bookmarks.data} bookmarkPage={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ bookmarks }) => ({
  bookmarks,
});

const mapDispatchToProps = dispatch => ({
  fetchBookmarks: () => dispatch(Actions.fetchBookmarks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
