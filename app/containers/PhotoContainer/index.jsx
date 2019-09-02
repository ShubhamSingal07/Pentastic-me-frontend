import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import * as Actions from '../../actions';
import CommentsList from '../../components/CommentsList';

const OAUTH_URL = process.env.OAUTH_URL;

class Photo extends React.Component {
  state = {
    likeLoading: false,
    commentLoading: false,
    commentInput: '',
    commentLoading: false,
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
    addComment({ userId: user._id, name: user.username, photoId: photo.data._id, comment: commentInput });
    this.setState({ commentLoading: false });
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
      <div>
        <div>
          {photo.data.url.length == 1 ? (
            <img src={photo.data.url[0]} />
          ) : (
            <Carousel>
              {photo.data.url.map(url => (
                <Carousel.Item key={url._id}>
                  <img className="d-block w-100" src={url.url} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div>
          {photo.data.likes.total > 0 ? <span>{photo.data.likes.total}</span> : null}
          {photo.data.isLiked ? (
            <button onClick={this.handleDislike}>Dislike</button>
          ) : (
            <button onClick={this.handleLike}>Like</button>
          )}
          <button onClick={this.handleAddComment}>Add Comment</button>
          <input
            name="comment"
            value={commentInput}
            placeholder="Add a comment"
            required
            onChange={this.handleValueChange}
          />
          <div>
            {photo.data.comments.total > 0 ? (
              <span>
                {photo.data.comments.total} {photo.data.comments.total > 1 ? 'comments' : 'comment'}
              </span>
            ) : null}
          </div>
          <CommentsList comments={photo.data.comments.comment} />
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
