import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import PhotoContainer from '../../containers/PhotoContainer';

class Photo extends React.Component {
  state = {
    loading: false,
  };

  async componentWillMount() {
    const { match, fetchPhoto, loggedIn } = this.props;
    const photoId = match.params.photoId;
    this.setState({ loading: true });
    await fetchPhoto({ photoId, loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { photo } = this.props;

    if (loading) return <div className="photo-page">Loading</div>;

    if (photo.error) return <div className="photo-page">{photo.error}</div>;

    return (
      <div className="photo-page">
        <PhotoContainer />
      </div>
    );
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
