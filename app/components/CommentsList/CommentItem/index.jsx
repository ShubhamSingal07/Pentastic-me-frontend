import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../../actions';

class CommentItem extends React.Component {
  state = {
    editLoading: false,
    deleteLoading: false,
    editComment: false,
    commentInput: '',
  };

  handleSaveEditedComment = () => {
    const { commentInput } = this.state;
    const { photoId, editComment, comment } = this.props;
    this.setState({ editLoading: true });
    editComment({ photoId, commentId: comment._id, comment: commentInput });
    this.setState({ editLoading: false, editComment: false });
  };

  handleDeleteComment = () => {
    const { deleteComment, photoId, comment } = this.props;
    this.setState({ deleteLoading: true });
    deleteComment({ photoId, commentId: comment._id });
    this.setState({ deleteLoading: false });
  };

  handleValueChange = e => {
    this.setState({
      commentInput: e.target.value,
    });
  };

  render() {
    const { editLoading, deleteLoading, commentInput, editComment } = this.state;
    const { userId, comment } = this.props;
    return (
      <div>
        <div>
          <span>{comment.name} </span>
          <span> {comment.body}</span>
        </div>
        {userId === comment.userId ? (
          <div>
            {!editComment ? (
              <button onClick={() => this.setState({ editComment: true })}>Edit</button>
            ) : (
              <div>
                <input type="text" value={commentInput} onChange={this.handleValueChange} placeholder="Add a comment" />
                <button onClick={this.handleSaveEditedComment}>Save</button>
              </div>
            )}
            <button onClick={this.handleDeleteComment}>Delete</button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user, photo }) => ({
  userId: user.data._id,
  photoId: photo.data._id,
});

const mapDispatchToProps = dispatch => ({
  editComment: payload => dispatch(Actions.editComment(payload)),
  deleteComment: payload => dispatch(Actions.deleteComment(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentItem);
