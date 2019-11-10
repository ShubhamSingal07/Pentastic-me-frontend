import Actions from '../store/actions';

const refreshSuccess = payload => ({
  type: Actions.refreshSuccess,
  payload,
});

const refreshFail = payload => ({
  type: Actions.refreshFail,
  payload,
});

const URL = process.env.URL;

export const refresh = ({ loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/refresh`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200 || response.status === 403) {
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(refreshSuccess(data));
    }
    return dispatch(refreshFail(data));
  } catch (err) {
    if (err.name === 'Abort Error') return true;
    return dispatch(
      refreshFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
