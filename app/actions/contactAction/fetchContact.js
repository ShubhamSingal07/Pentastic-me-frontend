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

export const fetchContact = ({ loggedIn }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/contact`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      dispatch(fetchContactSuccess(data));
      return data.contact.contact;
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
