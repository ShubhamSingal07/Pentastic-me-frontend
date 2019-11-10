import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import SortableComponent from '../SortableComponent';
import ImageDeleteIcon from '../ImageDeleteIcon';
import SpinnerLoader from '../Loaders/SpinnerLoader';

class ImageUpload extends React.Component {
  state = {
    uploadImage: true,
    loading: false,
    selectedFile: undefined,
  };

  abortController = new AbortController();

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleFileSelector = async e => {
    const { uploadImage } = this.props;
    this.setState({ loading: true });
    const data = await uploadImage({ files: e.target.files, signal: this.abortController.signal });
    if (data === true) return;
    if (data && data.error) this.setState({ loading: false, uploadImage: true });
    else this.setState({ loading: false, uploadImage: false });
  };

  handleUploadImage = () => {
    this.setState({ uploadImage: true });
  };

  render() {
    const { uploadImage, selectedFile, loading } = this.state;
    const { isPublishModal, images } = this.props;

    return (
      <div className="image-upload-container p-2">
        {isPublishModal ? (
          <div>
            {loading ? (
              <div className="spinner-container">
                <SpinnerLoader />
              </div>
            ) : uploadImage ? (
              <div>
                <div>
                  <input
                    type="file"
                    value={selectedFile}
                    onChange={this.handleFileSelector}
                    style={{ display: 'none' }}
                    required
                    ref={fileInput => (this.fileInput = fileInput)}
                  />
                  <button className="btn btn-outline-dark" onClick={() => this.fileInput.click()}>
                    Add Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="position-relative">
                <img src={images.data[images.data.length - 1].url} width="100%" />
                <ImageDeleteIcon index={0} handleUploadImage={this.handleUploadImage} isPublishModal={true} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <SortableComponent />
            <div>
              <div className="mt-3 text-center">
                <input
                  type="file"
                  value={selectedFile}
                  onChange={this.handleFileSelector}
                  ref={fileInput => (this.fileInput = fileInput)}
                  style={{ display: 'none' }}
                  multiple
                />
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <button
                    className="m-auto btn btn-outline-primary btn-blue-grey d-inline-block"
                    disabled={loading}
                    onClick={() => this.fileInput.click()}>
                    Add Image
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => ({
  images,
});

const mapDispatchToProps = dispatch => ({
  uploadImage: payload => dispatch(Actions.uploadImage(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUpload);
