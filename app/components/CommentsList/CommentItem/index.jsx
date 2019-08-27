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

  handleSaveEditedComment = () => {
    const { commentInput } = this.state;
    const { photoId, editComment } = this.props;
    this.setState({ editLoading: true });
    editComment({ photoId, commentId: comment.Id, comment: commentInput });
    this.setState({ editLoading: false, editComment: false });
  };

  handleDeleteComment = () => {
    const { deleteComment, photoId } = this.props;
    this.setState({ deleteLoading: true });
    deleteComment({ photoId, commentId: comment.id });
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
          <span>{comment.name}</span>
          <span>{comment.body}</span>
        </div>
        {userId === comment.userId ? (
          <div>
            {!editComment ? (
              <span onClick={() => this.setState({ editComment: true })}>Edit</span>
            ) : (
              <div>
                <input type="text" value={commentInput} onChange={this.handleValueChange} placeholder="Add a comment" />
                <span onClick={this.handleSaveEditedComment}>Save</span>
              </div>
            )}
            <span onClick={this.handleDeleteComment}>Delete</span>
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
