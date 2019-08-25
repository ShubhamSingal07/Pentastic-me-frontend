import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../../actions';

class CommentItem extends React.Component {
  state = {
    editLoading: false,
    deleteLoading: false,
    editComment: false,
    commentInput: this.props.comment.body,
  };

  render() {
    const { editLoading, deleteLoading, commentInput, editComment } = this.state;
    const { photoId, userId, editComment, deleteComment, comment } = this.props;

    const handleSaveEditedComment = () => {
      this.setState({ editLoading: true });
      editComment({ photoId, commentId: comment.Id, comment: commentInput });
      this.setState({ editLoading: false, editComment: false });
    };

    const handleDeleteComment = () => {
      this.setState({ deleteLoading: true });
      deleteComment({ photoId, commentId: comment.id });
      this.setState({ deleteLoading: false });
    };

    const handleValueChange = e => {
      this.setState({
        commentInput: e.target.value,
      });
    };

    return (
      <div>
        <div>
          <span>{comment.name}</span>
          <span>{comment.body}</span>
        </div>
        {userId === comment.userId ? (
          <div>
            {!editComment ? (
              <span onClick={() => this.setState({ editComment: true })}>Edit</span>
            ) : (
              <div>
                <input type="text" value={commentInput} onChange={handleValueChange} placeholder="Add a comment" />
                <span onClick={handleSaveEditedComment}>Save</span>
              </div>
            )}
            <span onClick={handleDeleteComment}>Delete</span>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user, photo }) => ({
  userId: user.data.id,
  photoId: photo.data.id,
});

const mapDispatchToProps = dispatch => ({
  editComment: payload => dispatch(Actions.editComment(payload)),
  deleteComment: payload => dispatch(Actions.deleteComment(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentItem);
