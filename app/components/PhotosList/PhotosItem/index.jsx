import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Actions from '../../../actions';

const OAUTH_URL = process.env.OAUTH_URL;

class PhotosItem extends React.Component {
  state = {
    likeLoading: false,
  };

  handleLike = () => {
    const { likePhotos, photo, loggedIn } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ likeLoading: true });
    likePhotos({ photoId: photo._id });
    this.setState({ likeLoading: false });
  };

  handleDislike = () => {
    const { dislikePhotos, photo, loggedIn } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ likeLoading: true });
    dislikePhotos({ photoId: photo._id });
    this.setState({ likeLoading: false });
  };

  render() {
    const { likeLoading } = this.state;
    const { photo } = this.props;
    return (
      <div>
        <Link to={`/photos/${photo._id}`}>
          {photo.url.length == 1 ? (
            <img src={photo.url[0].url} />
          ) : (
            <div>
              <img src={photo.url[0].url} />
              <div>Collection</div>
            </div>
          )}
        </Link>
        <div>
          {photo.likes}
          {photo.isLiked ? (
            <button onClick={this.handleDislike}>Dislike</button>
          ) : (
            <button onClick={this.handleLike}>Like</button>
          )}
          <Link to={`/photos/${photo._id}`}>Comment</Link>
        </div>
        {photo.comments > 0 ? (
          <Link to={`/photos/${photo._id}`}>
            View {photo.comments == 1 ? null : 'all'} {photo.comments} {photo.comments == 1 ? 'comment' : 'comments'}
          </Link>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  likePhotos: payload => dispatch(Actions.likePhotos(payload)),
  dislikePhotos: payload => dispatch(Actions.dislikePhotos(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotosItem);
