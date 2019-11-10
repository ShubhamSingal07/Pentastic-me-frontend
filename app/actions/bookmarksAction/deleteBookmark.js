import Actions from '../../store/actions';

const deleteBookmarksSuccess = payload => ({
  type: Actions.deleteBookmarksSuccess,
  payload,
});

const deleteBookmarksFail = payload => ({
  type: Actions.deleteBookmarksFail,
  payload,
});

const deleteBookmarkSuccess = () => ({
  type: Actions.deleteBookmarkSuccess,
});

const deleteBookmarkFail = payload => ({
  type: Actions.deleteBookmarkFail,
  payload,
});

const URL = process.env.URL;

export const deleteBookmark = ({ storyId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/bookmark/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(deleteBookmarkSuccess());
    }
    return dispatch(deleteBookmarkFail(data));
  } catch (err) {
    return dispatch(
      deleteBookmarkFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const deleteBookmarks = ({ storyId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/bookmark/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(deleteBookmarksSuccess({ storyId }));
    }
    return dispatch(deleteBookmarksFail(data));
  } catch (err) {
    return dispatch(
      deleteBookmarksFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
