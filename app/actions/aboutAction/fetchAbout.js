import Actions from '../../store/actions';

const fetchAboutSuccess = payload => ({
  type: Actions.fetchAboutSuccess,
  payload,
});

const fetchAboutFail = payload => ({
  type: Actions.fetchAboutFail,
  payload,
});

const URL = process.env.URL;

export const fetchAbout = ({ loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/about`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      dispatch(fetchAboutSuccess(data));
      return data.about.about;
    }
    return dispatch(fetchAboutFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchAboutFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
