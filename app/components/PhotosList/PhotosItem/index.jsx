import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';
import '../../../styles/animation/list-animation.scss';
import * as Actions from '../../../actions';
import LikeHeart from '../../LikeHeart';
import gallery from '../../../../public/icons/galleryIcon.svg';
import CommentIcon from '../../CommentIcon';

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
    const { photo, index } = this.props;
    let className = '';
    if (index % 3 === 0) {
      className = 'left';
    } else if (index % 3 === 1) {
      className = 'top';
    } else {
      className = 'right';
    }
    return (
      <div
        className={`${className} col-lg-4 col-md-4 col-sm-6 col-12 my-2`}
        style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
        <div className="photo-card">
          <Link className="link" to={`/photos/${photo._id}`}>
            <div className="photo-item">
              <img className="img-item" src={photo.url[0].url} width="100%" />
              {photo.url.length === 1 ? null : <img src={gallery} className="gallery-icon" />}
            </div>
          </Link>
          <div className="counter-box">
            <span className="p-2 mr-1 ml-1">
              {photo.likes > 0 ? <span className="counter my-auto">{photo.likes}</span> : null}
              <button
                className="p-0 bg-transparent border-0 btn my-auto"
                onClick={photo.isLiked ? this.handleDislike : this.handleLike}>
                <LikeHeart isLiked={photo.isLiked} />
              </button>
            </span>
            <Link className="ml-3 p-0 link" to={`/photos/${photo._id}`}>
              {photo.comments > 0 ? <span className="counter mr-1">{photo.comments}</span> : null}
              <CommentIcon />
            </Link>
          </div>
        </div>
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
