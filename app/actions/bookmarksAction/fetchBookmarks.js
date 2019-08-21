import Actions from '../../store/actions';

const fetchBookmarksSuccess = payload => ({
  type: Actions.fetchBookmarksSuccess,
  payload,
});

const fetchBookmarksFail = payload => ({
  type: Actions.fetchBookmarksFail,
  payload,
});

const URL = process.env.URL;

export const fetchBookmarks = () => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/bookmark`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(fetchBookmarksSuccess(data));
    }
    return dispatch(fetchBookmarksFail(data));
  } catch (err) {
    return dispatch(
      fetchBookmarksFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
