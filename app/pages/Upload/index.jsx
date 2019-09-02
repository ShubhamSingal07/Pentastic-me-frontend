import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import ImageUpload from '../../components/ImageUpload';

class Upload extends React.Component {
  state = {
    loading: false,
    uploadLoading: false,
    error: '',
  };

  async componentWillMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    await refresh({ loggedIn });
    this.setState({ loading: false });
  }

  handleImageUpload = async () => {
    const { images } = this.props;
    try {
      this.setState({ uploadLoading: true, error: undefined });
      const data = await Actions.postPhotos(images.data);
      if (data.error) return this.setState({ error: data.error, uploadLoading: false });
      else {
        this.setState({ uploadLoading: false, error: undefined });
        return this.props.history.push('/photos/page/0');
      }
    } catch (err) {
      this.setState({ uploadLoading: false, error: 'oof' });
    }
  };

  render() {
    const { loading, uploadLoading, error } = this.state;
    const { images, loggedIn, role } = this.props;

    if (loading) return <div className="upload-page">Loading</div>;

    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);

    if (role !== 'Admin') return <Redirect to="/" />;

    return (
      <div className="upload-page">
        {error ? <div>{error}</div> : null}
        <ImageUpload isPublishModal={false} />
        {images.data.length > 0 ? <button onClick={this.handleImageUpload}>Upload</button> : null}
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
