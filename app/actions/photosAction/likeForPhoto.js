import Actions from '../../store/actions';

const likePhotoSuccess = () => ({
  type: Actions.likePhotoSuccess,
});

const likePhotoFail = payload => ({
  type: Actions.likePhotoFail,
  payload,
});

const dislikePhotoSuccess = () => ({
  type: Actions.dislikePhotoSuccess,
});

const dislikePhotoFail = payload => ({
  type: Actions.dislikePhotoFail,
  payload,
});

export const likePhoto = ({ photoId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/like/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(likePhotoSuccess());
    }
    return dispatch(likePhotoFail(data));
  } catch (err) {
    return dispatch(
      likePhotoFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const dislikePhoto = ({ photoId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/dislike/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(dislikePhotoSuccess());
    }
    return dispatch(dislikePhotoFail(data));
  } catch (err) {
    return dispatch(
      dislikePhotoFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
