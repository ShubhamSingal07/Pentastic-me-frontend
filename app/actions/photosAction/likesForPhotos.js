import Actions from '../../store/actions';

const likePhotosSuccess = payload => ({
  type: Actions.likePhotosSuccess,
  payload,
});

const likePhotosFail = payload => ({
  type: Actions.likePhotosFail,
  payload,
});

const dislikePhotosSuccess = payload => ({
  type: Actions.dislikePhotosSuccess,
  payload,
});

const dislikePhotosFail = payload => ({
  type: Actions.dislikePhotosFail,
  payload,
});

const URL = process.env.URL;

export const likePhotos = ({ photoId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/like/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(likePhotosSuccess({ photoId }));
    }
    return dispatch(likePhotosFail(data));
  } catch (err) {
    return dispatch(
      likePhotosFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const dislikePhotos = ({ photoId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo/dislike/${photoId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(dislikePhotosSuccess({ photoId }));
    }
    return dispatch(dislikePhotosFail(data));
  } catch (err) {
    return dispatch(
      dislikePhotosFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
