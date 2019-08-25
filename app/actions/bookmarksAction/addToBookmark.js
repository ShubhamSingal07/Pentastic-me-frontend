import Actions from '../../store/actions';

const addBookmarkSuccess = () => ({
  type: Actions.addBookmarkSuccess,
});

const addBookmarkFail = payload => ({
  type: Actions.addBookmarkFail,
  payload,
});

const URL = process.env.URL;

export const addToBookmark = storyId => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/bookmark`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storyId }),
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(addBookmarkSuccess());
    }
    return dispatch(addBookmarkFail(data));
  } catch (err) {
    return dispatch(
      addBookmarkFail({
        error: 'Oops! Looks like something qent wrong',
      }),
    );
  }
};
