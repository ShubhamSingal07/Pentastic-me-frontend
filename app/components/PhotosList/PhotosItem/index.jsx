import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as Actions from '../../../actions';

class PhotosItem extends React.Component {
  state = {
    likeLoading: false,
  };

  handleLike = () => {
    const { likePhotos, photo } = this.props;
    this.setState({ likeLoading: true });
    likePhotos({ photoId: photo.id });
    this.setState({ likeLoading: false });
  };

  handleDislike = () => {
    const { dislikePhotos, photo } = this.props;
    this.setState({ likeLoading: true });
    dislikePhotos({ photoId: photo.id });
    this.setState({ likeLoading: false });
  };

  render() {
    const { likeLoading } = this.state;
    const { photo } = this.props;

    return (
      <div>
        <Link to={`/photos/${photo.id}`}>
          {photo.url.length == 1 ? (
            <img src={photo.url[0]} />
          ) : (
            <Carousel>
              {photo.url.map(url => (
                <PhotoCarousel url={url} />
              ))}
            </Carousel>
          )}
        </Link>
        <div>
          {photo.isLiked ? <span onClick={this.handleLike}>Like</span> : <span onClick={this.handleDislike}>Dislike</span>}
          <Link to={`/photos/${photo.id}`}>Comment</Link>
        </div>
        {photo.comments.total > 0 ? (
          <Link to={`/photos/${photo.id}`}>
            View {photo.comments.total == 1 ? null : 'all'} {photo.comments.total}{' '}
            {photo.comments.total == 1 ? 'comment' : 'comments'}
          </Link>
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
