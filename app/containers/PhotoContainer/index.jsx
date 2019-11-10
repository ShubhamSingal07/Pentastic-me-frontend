import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import './style.scss';

import * as Actions from '../../actions';
import CommentsList from '../../components/CommentsList';
import nextIcon from '../../../public/icons/nextIcon.svg';
import prevIcon from '../../../public/icons/prevIcon.svg';
import LikeHeart from '../../components/LikeHeart';
import CommentIcon from '../../components/CommentIcon';

const OAUTH_URL = process.env.OAUTH_URL;

class Photo extends React.Component {
  state = {
    likeLoading: false,
    commentLoading: false,
    commentInput: '',
  };

  handleLike = () => {
    const { likePhoto, photo, loggedIn } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ likeLoading: true });
    likePhoto({ photoId: photo.data._id });
    this.setState({ likeLoading: false });
  };

  handleDislike = () => {
    const { dislikePhoto, photo, loggedIn } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ likeLoading: true });
    dislikePhoto({ photoId: photo.data._id });
    this.setState({ likeLoading: false });
  };

  handleAddComment = () => {
    const { addComment, user, loggedIn, photo } = this.props;
    const { commentInput } = this.state;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    if (commentInput.trim().length === 0) {
      return;
    }
    this.setState({ commentLoading: true });
    addComment({
      userId: user._id,
      thumbnail: user.thumbnail,
      name: user.username,
      photoId: photo.data._id,
      comment: commentInput,
    });
    this.setState({ commentLoading: false, commentInput: '' });
  };

  handleValueChange = e => {
    this.setState({
      commentInput: e.target.value,
    });
  };

  render() {
    const { photo } = this.props;
    const { commentInput } = this.state;

    return (
      <div className="photo-container-fluid">
        <div className="img-container">
          {photo.data.url.length === 1 ? (
            <img className="d-block w-100" src={photo.data.url[0].url} />
          ) : (
            <Carousel
              wrap={false}
              interval={null}
              nextIcon={<img src={nextIcon} width="100%" />}
              prevIcon={<img src={prevIcon} width="100%" />}
              touch={true}>
              {photo.data.url.map(url => (
                <Carousel.Item key={url._id}>
                  <img className="d-block w-100" src={url.url} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div className="comments-list pt-1 px-2 pb-2">
          <div className="border-bottom pb-1 text-center">
            <span className="ml-2 mr-5">
              {photo.data.likes.total > 0 ? <span>{photo.data.likes.total} </span> : null}
              <button onClick={photo.data.isLiked ? this.handleDislike : this.handleLike}>
                <LikeHeart isLiked={photo.data.isLiked} />
              </button>
            </span>
            <span className="ml-5" style={{ cursor: 'pointer' }} onClick={() => this.ref.focus()}>
              <span>{photo.data.comments.total > 0 ? photo.data.comments.total : null} </span>
              <CommentIcon />
            </span>
          </div>
          <CommentsList comments={photo.data.comments.comment} />
        </div>
        <div className="comment-input-box d-flex justify-content-between">
          <input
            className="comment-input photo-comment"
            name="comment"
            value={commentInput}
            placeholder="Add a comment"
            onChange={this.handleValueChange}
            ref={el => (this.ref = el)}
          />
          <button
            disabled={commentInput.trim().length === 0}
            className={commentInput.trim().length === 0 ? 'mr-2 disabled' : 'mr-2 text-primary'}
            onClick={this.handleAddComment}>
            POST
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, photo }) => ({
  user: user.data,
  loggedIn: auth.loggedIn,
  photo,
});

const mapDispatchToProps = dispatch => ({
  likePhoto: payload => dispatch(Actions.likePhoto(payload)),
  dislikePhoto: payload => dispatch(Actions.dislikePhoto(payload)),
  addComment: payload => dispatch(Actions.addComment(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photo);
