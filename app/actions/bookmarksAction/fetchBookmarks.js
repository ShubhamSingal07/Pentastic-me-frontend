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

export const fetchBookmarks = ({ loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/bookmark`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(fetchBookmarksSuccess(data));
    }
    return dispatch(fetchBookmarksFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchBookmarksFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
