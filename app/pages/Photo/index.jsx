import React from 'react';
import { connect } from 'react-router-dom';

import * as Actions from '../../actions';
import PhotoContainer from '../../containers/PhotoContainer';

class Photo extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { match, fetchPhoto, loggedIn } = this.props;
    const photoId = match.params.photoId;
    this.setState({ loading: true });
    fetchPhoto({ photoId, loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { photo } = this.props;

    if (loading) return <div>Loading</div>;

    if (photo.error) return <div>{photo.error}</div>;

    return <PhotoContainer photo={photo.data} />;
  }
}

const mapStateToProps = ({ auth, photo }) => ({
  loggedIn: auth.loggedIn,
  photo,
});

const mapDispatchToProps = dispatch => ({
  fetchPhoto: payload => dispatch(Actions.fetchPhoto(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photo);
