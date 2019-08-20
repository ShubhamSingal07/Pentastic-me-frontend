import Actions from '../../store/actions';

const fetchDraftsSuccess = payload => ({
  type: Actions.fetchDraftsSuccess,
  payload,
});

const fetchDraftsFail = payload => ({
  type: Actions.fetchDraftsFail,
  payload,
});

const fetchDraftSuccess = payload => ({
  type: Actions.fetchDraftSuccess,
  payload,
});

const fetchDraftFail = payload => ({
  type: Actions.fetchDraftFail,
  payload,
});

const URL = process.env.URL;

export const fetchDrafts = ({ loggedIn }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/draft`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = date.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      return dispatch(fetchDraftsSuccess(data));
    }
    return dispatch(fetchDraftsFail(data));
  } catch (err) {
    return dispatch(
      fetchDraftsFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const fetchDraft = ({ draftId, loggedIn }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/draft?draftId=${draftId}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = date.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      return dispatch(fetchDraftSuccess(data));
    }
    return dispatch(fetchDraftFail(data));
  } catch {
    return dispatch(
      fetchDraftFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
