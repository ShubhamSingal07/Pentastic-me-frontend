import Actions from '../store/actions';

const loginSuccess = payload => ({
  type: Actions.loginSuccess,
  payload,
});

const loginFail = payload => ({
  type: Actions.loginFail,
  payload,
});

export const login = (id, signal) => async dispatch => {
  try {
    const URL = process.env.URL;
    const response = await fetch(`${URL}/api/token?id=${id}`, {
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(loginSuccess(data));
    }
    return dispatch(loginFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      loginFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
