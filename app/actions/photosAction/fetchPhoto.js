import Actions from '../../store/actions';

const fetchPhotosSuccess = payload => ({
  type: Actions.fetchPhotosSuccess,
  payload,
});

const fetchPhotosFail = payload => ({
  type: Actions.fetchPhotosFail,
  payload,
});

const fetchPhotoSuccess = payload => ({
  type: Actions.fetchPhotoSuccess,
  payload,
});

const fetchPhotoFail = payload => ({
  type: Actions.fetchPhotoFail,
  payload,
});

const URL = process.env.URL;

export const fetchPhotos = ({ page, loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo?page=${page - 1}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(fetchPhotosSuccess(data));
    }
    return dispatch(fetchPhotosFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchPhotosFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const fetchPhoto = ({ photoId, loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/photo?photoId=${photoId}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      return dispatch(fetchPhotoSuccess(data));
    }
    return dispatch(fetchPhotoFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchPhotoFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
