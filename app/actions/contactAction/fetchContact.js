import Actions from '../../store/actions';

const fetchContactSuccess = payload => ({
  type: Actions.fetchContactSuccess,
  payload,
});

const fetchContactFail = payload => ({
  type: Actions.fetchContactFail,
  payload,
});

const URL = process.env.URL;

export const fetchContact = () => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/contact`, {
      headers: {
        Auhtorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(fetchContactSuccess(data));
    }
    return fetchContactFail(data);
  } catch (err) {
    return dispatch(
      fetchContactFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
