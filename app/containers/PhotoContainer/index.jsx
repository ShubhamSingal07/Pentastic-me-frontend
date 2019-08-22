import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import * as Actions from '../../actions';
import PhotoCarousel from '../../components/PhotosList/PhotosItem/PhotoCarousel';

class Photo extends React.Component {
  state = {
    loading: false,
    isLiked: false,
  };

  render() {
    const { photo, likePhoto, dislikePhoto } = this.props;
    const { isLiked } = this.state;
    this.setState({ isLiked: photo.isLiked });

    const handleLike = () => {
      this.setState({ loading: true });
      likePhoto({ photoId: photo.id });
      this.setState({ loading: false });
    };

    const handleDislike = () => {
      this.setState({ loading: true });
      dislikePhoto({ photoId: photo.id });
      this.setState({ loading: false });
    };

    return (
      <div>
        <div>
          {photo.url.length == 1 ? (
            <img src={photo.url[0]} />
          ) : (
            <Carousel>
              photo.url.map(url => <PhotoCarousel url={url} />)
            </Carousel>
          )}
        </div>
        <div>
          {isLiked ? <button onClick={handleDislike}>Dislike</button> : <button onClick={handleLike}>Like</button>}
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  likePhoto: payload => dispatch(Actions.likePhoto(payload)),
  dislikePhoto: payload => dispatch(Actions.dislikePhoto(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Photo);
