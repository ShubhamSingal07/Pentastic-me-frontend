import React from 'react';

import * as Actions from '../../actions';

class ImageUpload extends React.Component {
  state = {
    uploadImage: true,
    selectedFile: null,
    imageLoading: false,
    error: null,
    images: [],
  };

  handleImageUpload = async () => {
    const { imageChange } = this.props;
    this.setState({ imageLoading: true });
    const data = await Actions.uploadImage(selectedFile, selectedFile.name);
    this.setState({ imageLoading: false });
    if (data.error) this.setState({ error: data.error });
    else {
      const arr = images;
      arr.push(data);
      this.setState({ images: arr, uploadImage: false });
      imageChange(data.secure_url);
    }
  };

  handleFileSelector = async e => {
    this.setState({ selectedFile: e.target.files[0] });
    await handleImageUpload();
  };

  render() {
    const { uploadImage, selectedFile, uploadImage, error, images } = this.state;
    const { isPublishModal } = this.props;

    if (error) return <div>{error}</div>;

    return (
      <div>
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
                    ref={fileInput => (this.fileInput = fileInput)}
                  />
                  <button onClick={() => this.fileInput.click()}>+</button>
                </div>
              </div>
            ) : (
              <div>
                <img src={images[0].secure_url} />
              </div>
            )}
          </div>
        ) : (
          <div>
            {images.map(image => (
              <div>
                <img src={image.secure_url} />
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

export default ImageUpload;
