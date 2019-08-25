import React from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as Actions from '../../../actions';

class PhotosItem extends React.Component {
  state = {
    likeLoading: false,
  };

  render() {
    const { likeLoading } = this.state;
    const { likePhotos, dislikePhotos, photo } = this.props;

    const handleClick = () => {
      <Redirect to={`/photos/${photo.id}`} />;
    };

    const handleLike = () => {
      this.setState({ likeLoading: true });
      likePhotos({ photoId: photo.id });
      this.setState({ likeLoading: false });
    };

    const handleDislike = () => {
      this.setState({ likeLoading: true });
      dislikePhotos({ photoId: photo.id });
      this.setState({ likeLoading: false });
    };

    return (
      <div>
        <div onClick={handleClick}>
          {photo.url.length == 1 ? (
            <img src={photo.url[0]} />
          ) : (
            <Carousel>
              {photo.url.map(url => (
                <PhotoCarousel url={url} />
              ))}
            </Carousel>
          )}
        </div>
        <div>
          {photo.isLiked ? <span onClick={handleLike}>Like</span> : <span onClick={handleDislike}>Dislike</span>}
          <span onClick={handleCLick}>Comment</span>
        </div>
        {photo.comments.total > 0 ? (
          <div onClick={handleClick}>
            View {photo.comments.total == 1 ? null : 'all'} {photo.comments.total}{' '}
            {photo.comments.total == 1 ? 'comment' : 'comments'}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  likePhotos: payload => dispatch(Actions.likePhotos(payload)),
  dislikePhotos: payload => dispatch(Actions.dislikePhotos(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(PhotosItem);
