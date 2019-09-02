import Actions from '../../store/actions';

const deleteDraftsSuccess = payload => ({
  type: Actions.deleteDraftsSuccess,
  payload,
});

const deleteDraftsFail = payload => ({
  type: Actions.deleteDraftsFail,
  payload,
});

const URL = process.env.URL;

export const deleteDrafts = ({ draftId }) => async dispatch => {
  try {
    console.log('in delete draft actions');
    const response = await fetch(`${URL}/api/draft/${draftId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(deleteDraftsSuccess({ draftId }));
    }
    return dispatch(deleteDraftsFail(data));
  } catch (err) {
    return dispatch(
      deleteDraftsFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const deleteDraft = async ({ draftId }) => {
  try {
    const response = await fetch(`${URL}/api/draft/${draftId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
