import Actions from '../../store/actions';

const fetchUsersSuccess = payload => ({
  type: Actions.fetchUsersSuccess,
  payload,
});

const fetchUsersFail = payload => ({
  type: Actions.fetchUsersFail,
  payload,
});

const URL = process.env.URL;

export const fetchUsers = ({ loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/user`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      return dispatch(fetchUsersSuccess(data));
    }
    return dispatch(fetchUsersFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchUsersFail({
        error: 'Oops! Looks like something went wrong.',
      }),
    );
  }
};
