import Actions from '../../store/actions';

const addCommentSuccess = payload => ({
  type: Actions.addCommentSuccess,
  payload,
});

const addCommentFail = payload => ({
  type: Actions.addCommentFail,
  payload,
});

const editCommentSuccess = payload => ({
  type: Actions.editCommentSuccess,
  payload,
});

const editCommentFail = payload => ({
  type: Actions.editCommentFail,
  payload,
});

const deleteCommentSuccess = payload => ({
  type: Actions.deleteCommentSuccess,
  payload,
});

const deleteCommentFail = payload => ({
  type: Actions.deleteCommentFail,
  payload,
});

const URL = process.env.URL;

export const addComment = ({ userId, thumbnail, name, photoId, comment }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/comment/add/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    const data = await response.json();
    if (response.status === 200) {
      data.userId = userId;
      data.thumbnail = thumbnail;
      data.comment = comment;
      data.name = name;
      data._id = data.commentId;
      return dispatch(addCommentSuccess(data));
    }
    return dispatch(addCommentFail(data));
  } catch (err) {
    return dispatch(
      addCommentFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const editComment = ({ photoId, commentId, comment }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/comment/edit/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, commentId }),
    });
    const data = await response.json();
    if (response.status === 200) {
      data.photoId = photoId;
      data.commentId = commentId;
      data.comment = comment;
      return dispatch(editCommentSuccess(data));
    }
    return dispatch(editCommentFail(data));
  } catch (err) {
    return dispatch(
      editCommentFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const deleteComment = ({ photoId, commentId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/comment/${photoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId }),
    });
    const data = await response.json();
    if (response.status === 200) {
      data.commentId = commentId;
      return dispatch(deleteCommentSuccess(data));
    }
    return dispatch(deleteCommentFail(data));
  } catch (err) {
    return dispatch(
      deleteCommentFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
