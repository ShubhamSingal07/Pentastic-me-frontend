import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import Error500 from '../../components/Error/Error500';
import editIcon from '../../../public/icons/edit.svg';
import bg from '../../../public/images/bg.jpeg';

class About extends React.Component {
  state = {
    aboutHtml: '',
    loading: false,
    readOnly: true,
    selectedFile: undefined,
    uploadLoading: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { fetchAbout, loggedIn } = this.props;
    this.setState({ loading: true });
    const body = await fetchAbout({ loggedIn, signal: this.abortController.signal });
    if (body === true) return;
    this.setState({ loading: false, aboutHtml: body });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleFileSelector = async e => {
    const { uploadImage } = this.props;
    this.setState({ uploadLoading: true });
    const isAborted = await uploadImage({
      files: e.target.files,
      editBackgroundImage: true,
      signal: this.abortController.signal,
    });
    if (isAborted === true) return;
    this.setState({ uploadLoading: false });
  };

  render() {
    const { loading, readOnly, aboutHtml, selectedFile, uploadLoading } = this.state;
    const { about, role, images } = this.props;

    if (loading) return <div />;

    if (about.error) return <Error500 message={about.error} />;

    return (
      <div className="about-page page">
        <Helmet>
          <title>About Me | PentasticMe</title>
        </Helmet>
        <div className="img-container">
          <img
            className="bg-image"
            src={images.data.length > 0 ? images.data[images.data.length - 1].url : bg}
            width="100%"
            style={uploadLoading ? { opacity: '0.5' } : null}
          />
          <div className="image-upload-loader-container">{uploadLoading ? <SpinnerLoader /> : null}</div>
          {role === 'Admin' ? (
            <span>
              <input
                type="file"
                value={selectedFile}
                onChange={this.handleFileSelector}
                style={{ display: 'none' }}
                required
                ref={fileInput => (this.fileInput = fileInput)}
              />
              <button className="editBtn btn p-2 rounded-circle" onClick={() => this.fileInput.click()}>
                <img src={editIcon} />
              </button>
            </span>
          ) : null}
        </div>
        <div className="about-container">
          <div className="about-heading con">
            <div className="about-heading">
              <h1 className="pl-3 pt-2 pb-0 mb-0">About Me</h1>
            </div>
            <div className="pb-2">
              <ReactQuillEditor readOnly={readOnly} value={aboutHtml} aboutPage={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ about, user, auth, images }) => ({
  about,
  role: user.data.role,
  loggedIn: auth.loggedIn,
  images,
});

const mapDispatchToProps = dispatch => ({
  fetchAbout: payload => dispatch(Actions.fetchAbout(payload)),
  uploadImage: payload => dispatch(Actions.uploadImage(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
