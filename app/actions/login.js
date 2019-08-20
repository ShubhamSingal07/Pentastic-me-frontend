import Actions from '../store/actions';

const loginSuccess = payload => ({
  type: Actions.loginSuccess,
  payload,
});

export const authenticateUser = id => async dispatch => {
  try {
    const URL = process.env.URL;
    const response = await fetch(`${URL}/api/token?id=${id}`);
    const res = await response.json();
    if (response.status == 200) {
      return dispatch(loginSuccess({ token: res.token }));
    }
  } catch (err) {
    console.log('could not complete fetch request', err);
  }
};
