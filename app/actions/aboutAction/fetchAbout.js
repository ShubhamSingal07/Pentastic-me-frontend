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

export const fetchAbout = () => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/about`, {
      headers: {
        Auhtorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(fetchAboutSuccess(data));
    }
    return dispatch(fetchAboutFail(data));
  } catch (err) {
    return dispatch(
      fetchAboutFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
