import React from 'react';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
import ImageUpload from '../../components/ImageUpload';

class Upload extends React.Component {
  state = {
    loading: false,
    images: [],
    error: '',
  };

  handleImageChange = data => {
    const { images } = this.state;
    const arr = images;
    arr.push(data);
    this.setState({ images: arr });
  };

  handleImageUpload = async () => {
    const { images } = this.state;
    this.setState({ loading: true, error: undefined });
    const data = await Actions.postPhotos(images);
    if (data.error) return this.setState({ error: data.error, loading: false });
    else {
      this.setState({ loading: false, error: undefined });
      return <Redirect to="/photos/page/0" />;
    }
  };

  render() {
    const { images, error } = this.state;
    return (
      <div>
        {error ? <div>{error}</div> : null}
        <ImageUpload isPublishModal={false} imageChange={handleImageChange} />
        {images.length > 0 ? <button onClick={this.handleImageUpload}>Upload</button> : null}
      </div>
    );
  }
}

export default Upload;
