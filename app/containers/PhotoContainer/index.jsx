import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import * as Actions from '../../actions';
import PhotoCarousel from '../../components/PhotosList/PhotosItem/PhotoCarousel';
import CommentsList from '../../components/CommentsList';

class Photo extends React.Component {
  state = {
    likeLoading: false,
    commentLoading: false,
    isLiked: false,
    commentInput: '',
  };

  handleLike = () => {
    const { likePhoto, photo, loggedIn } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:5000/auth/login" />;
    this.setState({ likeLoading: true });
    likePhoto({ photoId: photo.id });
    this.setState({ likeLoading: false });
  };

  handleDislike = () => {
    const { dislikePhoto, photo, loggedIn } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:5000/auth/login" />;
    this.setState({ likeLoading: true });
    dislikePhoto({ photoId: photo.id });
    this.setState({ likeLoading: false });
  };

  handleAddComment = () => {
    const { addComment, user, loggedIn } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:5000/auth/login" />;
    this.setState({ commentLoading: true });
    addComment({ userId: user.id, name: user.username, photoId: photo.id, commentInput });
    this.setState({ commentLoading: false });
  };

  handleValueChange = e => {
    this.setState({
      commentInput: e.target.value,
    });
  };

  render() {
    const { photo } = this.props;
    const { isLiked, commentInput } = this.state;
    this.setState({ isLiked: photo.isLiked });

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
          {photo.likes.total > 0 ? <span>{photo.likes.total}</span> : null}
          {isLiked ? <button onClick={this.handleDislike}>Dislike</button> : <button onClick={this.handleLike}>Like</button>}
          <button onClick={this.handleAddComment}>Add Comment</button>
          <input name="comment" value={commentInput} placeholder="Add a comment" onChange={this.handleValueChange} />
          <div>{photo.comments.total > 0 ? <span>{photo.comments.total} comments</span> : null}</div>
          <CommentsList comments={photo.comments.comment} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  user: user.data,
  loggedIn: auth.loggedIn,
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
