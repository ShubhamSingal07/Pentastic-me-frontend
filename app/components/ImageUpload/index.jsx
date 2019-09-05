import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';

class ImageUpload extends React.Component {
  state = {
    uploadImage: true,
    loading: false,
  };

  handleFileSelector = async e => {
    const { uploadImage } = this.props;
    this.setState({ loading: true });
    await uploadImage({ file: e.target.files[0], name: e.target.files[0].name });
    this.setState({ loading: false, uploadImage: false });
  };

  render() {
    const { uploadImage, selectedFile, loading } = this.state;
    const { isPublishModal, images } = this.props;
    if (loading) return <div>Loading</div>;

    return (
      <div>
        {images.error ? <div>{images.error}</div> : null}
        {isPublishModal ? (
          <div>
            {uploadImage ? (
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
                  <button onClick={() => this.fileInput.click()}>+</button>
                </div>
              </div>
            ) : (
              <div>
                <img src={images.data[0].url} width="100%" />
              </div>
            )}
          </div>
        ) : (
          <div>
            {images.data.map(image => (
              <div key={image.url}>
                <img src={image.url} height="200px" />
              </div>
            ))}
            <div>
              <div>
                <input
                  type="file"
                  value={selectedFile}
                  onChange={this.handleFileSelector}
                  ref={fileInput => (this.fileInput = fileInput)}
                  style={{ display: 'none' }}
                />
                <button onClick={() => this.fileInput.click()}>+</button>
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
