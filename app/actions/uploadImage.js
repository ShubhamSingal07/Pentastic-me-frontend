import Actions from '../store/actions';

const uploadImageSuccess = payload => ({
  type: Actions.uploadImageSuccess,
  payload,
});

const uploadImageFail = payload => ({
  type: Actions.uploadImageFail,
  payload,
});

const URL = process.env.URL;

export const uploadImage = ({ file, name }) => async dispatch => {
  try {
    const fd = new FormData();
    fd.append('image', file, name);
    const response = await fetch(`${URL}/api/image/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      body: fd,
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(uploadImageSuccess(data));
    }
    return dispatch(uploadImageFail(data));
  } catch (err) {
    return dispatch(
      uploadImageFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
