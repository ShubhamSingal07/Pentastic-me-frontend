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

export const fetchDrafts = ({ loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/draft`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(fetchDraftsSuccess(data));
    }
    return dispatch(fetchDraftsFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchDraftsFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const fetchDraft = ({ draftId, loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/draft?draftId=${draftId}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      dispatch(fetchDraftSuccess(data));
      return { body: data.draft.body, title: data.draft.title };
    }
    return dispatch(fetchDraftFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchDraftFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
