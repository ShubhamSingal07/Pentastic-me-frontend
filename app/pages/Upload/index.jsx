import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import ImageUpload from '../../components/ImageUpload';
import Error500 from '../../components/Error/Error500';

class Upload extends React.Component {
  state = {
    loading: false,
    uploadLoading: false,
    error: '',
  };

  abortController = new AbortController();

  async componentWillMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    const isAborted = await refresh({ loggedIn, signal: this.abortController.signal });
    if (isAborted === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleImageUpload = async () => {
    const { images } = this.props;
    try {
      this.setState({ uploadLoading: true, error: undefined });
      const data = await Actions.postPhotos(images.data, this.abortController.signal);
      if (data === true) return;
      if (data.error) return this.setState({ error: data.error, uploadLoading: false });
      this.setState({ uploadLoading: false, error: undefined });
      return this.props.history.push('/photos/page/1');
    } catch (err) {
      this.setState({ uploadLoading: false, error: 'Oops! Looks like something went wrong' });
    }
  };

  render() {
    const { loading, uploadLoading, error } = this.state;
    const { images, loggedIn, role } = this.props;

    if (loading) return <div />;

    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);

    if (error) return <Error500 />;

    if (role !== 'Admin') return <Redirect to="/" />;

    return (
      <div className="upload-page page w-75 mx-auto">
        <Helmet>
          <title>Upload | PentasticMe</title>
        </Helmet>
        <h2 className="upload-heading">
          <div className="header-div">Upload Images</div>
        </h2>
        <ImageUpload isPublishModal={false} />
        {images.data.length > 0 ? (
          <div className="text-center">
            <button className="btn btn-outline-success btn-dark-green" onClick={this.handleImageUpload}>
              Upload
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ images, auth, user }) => ({
  images,
  loggedIn: auth.loggedIn,
  role: user.data.role,
});

const mapDispatchToProps = dispatch => ({
  refresh: payload => dispatch(Actions.refresh(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
