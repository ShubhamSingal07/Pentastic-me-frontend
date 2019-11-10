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

export const uploadImage = ({ files, editBackgroundImage, signal }) => async dispatch => {
  try {
    const fd = new FormData();
    for (const file of files) {
      fd.append('image', file, file.name);
    }
    fd.append('editBackgroundImage', editBackgroundImage);
    const response = await fetch(`${URL}/api/image/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
      body: fd,
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(uploadImageSuccess(data));
    }
    return dispatch(uploadImageFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    await dispatch(
      uploadImageFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};

export const uploadImageBase64 = async file => {
  try {
    const fd = new FormData();
    fd.append('image', file);
    const response = await fetch(`${URL}/api/image/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      body: fd,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
