import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

import * as Actions from '../../../actions';
import editIcon from '../../../../public/icons/edit.svg';
import deleteIcon from '../../../../public/icons/delete.svg';
import userIcon from '../../../../public/icons/user.svg';

class CommentItem extends React.Component {
  state = {
    editLoading: false,
    deleteLoading: false,
    editComment: false,
    commentInput: '',
  };

  componentDidMount() {
    const { comment } = this.props;
    this.setState({ commentInput: comment.body });
  }

  handleSaveEditedComment = async () => {
    const { commentInput } = this.state;
    const { photoId, editComment, comment } = this.props;
    this.setState({ editLoading: true });
    await editComment({ photoId, commentId: comment._id, comment: commentInput });
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
      <div className="d-flex flex-row align-items-start comment-item">
        <span className="mr-1">
          <img className="rounded-circle" src={comment.thumbnail || userIcon} width="30px" />
        </span>
        <span className="p-1 pr-2">
          <span className="font-weight-bold">{comment.name} </span>
          {editComment ? (
            <span>
              <input
                className="comment-input"
                type="text"
                value={commentInput}
                onChange={this.handleValueChange}
                placeholder="Add a comment"
              />
            </span>
          ) : (
            <span> {comment.body}</span>
          )}
        </span>
        {userId === comment.userId ? (
          <span className="ml-auto">
            {!editComment ? (
              <span className="d-flex">
                <button className="mr-2" onClick={() => this.setState({ editComment: true })}>
                  <img src={editIcon} />
                </button>
                <button className="mr-1" onClick={this.handleDeleteComment}>
                  <img src={deleteIcon} />
                </button>
              </span>
            ) : (
              <button
                disabled={commentInput.trim().length === 0}
                className={commentInput.trim().length === 0 ? 'mr-2 disabled' : 'mr-2 text-primary'}
                onClick={this.handleSaveEditedComment}>
                Save
              </button>
            )}
          </span>
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
