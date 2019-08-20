import Actions from '../../store/actions';

const clapStorySuccess = () => ({
  type: Actions.clapStorySuccess,
});

const clapStoryFail = payload => ({
  type: Actions.clapStoryFail,
  payload,
});

const unclapStorySuccess = () => ({
  type: Actions.unclapStorySuccess,
});

const unclapStoryFail = payload => ({
  type: Actions.unclapStoryFail,
  payload,
});

const URL = process.env.URL;

export const clapStory = ({ storyId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/story/clap/${storyId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return dispatch(clapStorySuccess());
    }
    return dispatch(clapStoryFail(data));
  } catch (err) {
    return dispatch(
      clapStoryFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const unclapStory = ({ storyId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/story/unclap/${storyId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    if (response.status === 200) {
      return dispatch(unclapStorySuccess());
    }
    return dispatch(unclapStoryFail(data));
  } catch (err) {
    return dispatch(
      unclapStoryFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
