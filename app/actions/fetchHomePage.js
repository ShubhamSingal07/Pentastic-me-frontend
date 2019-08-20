import Actions from '../store/actions';

const fetchHomePageSuccess = payload => ({
  type: Actions.fetchHomePageSuccess,
  payload,
});

const fetchHomePageFail = payload => ({
  type: Actions.fetchHomePageFail,
  payload,
});

export const fetchHomePage = ({ loggedIn }) => async dispatch => {
  try {
    const response = await fetch(`${process.env.URL}/api/home`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(fetchHomePageSuccess(data));
    }
    return dispatch(fetchHomePageFail(data));
  } catch (err) {
    // console.log(err);
    return dispatch(
      fetchHomePageFail({
        error: 'Oops! Looks like something went wrong.',
      }),
    );
  }
};
