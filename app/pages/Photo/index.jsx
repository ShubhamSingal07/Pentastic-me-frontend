import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import * as Actions from '../../actions';
import PhotoContainer from '../../containers/PhotoContainer';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

class Photo extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentWillMount() {
    const { match, fetchPhoto, loggedIn } = this.props;
    const photoId = match.params.photoId;
    this.setState({ loading: true });
    const isAborted = await fetchPhoto({ photoId, loggedIn, signal: this.abortController.signal });
    if (isAborted === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { photo } = this.props;

    if (loading) return <div />;

    if (photo.error && photo.error.status === 500) return <Error500 />;

    return (
      <div className="page">
        <Helmet>
          <title>Photos | PentasticMe</title>
        </Helmet>
        {photo.error ? <ErrorMessage message={photo.error.message} /> : null}
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
