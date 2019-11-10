import Actions from '../../store/actions';

const fetchStoriesSuccess = payload => ({
  type: Actions.fetchStoriesSuccess,
  payload,
});

const fetchStoriesFail = payload => ({
  type: Actions.fetchStoriesFail,
  payload,
});

const fetchStorySuccess = payload => ({
  type: Actions.fetchStorySuccess,
  payload,
});

const fetchStoryFail = payload => ({
  type: Actions.fetchStoryFail,
  payload,
});

const URL = process.env.URL;

export const fetchStories = ({ page, loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/story?page=${page - 1}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = loggedIn === data.loggedIn ? false : true;
      return dispatch(fetchStoriesSuccess(data));
    }

    return dispatch(fetchStoriesFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchStoriesFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};

export const fetchStory = ({ storyId, loggedIn, signal }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/story?storyId=${storyId}`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      data.loggedIn = data.user ? true : false;
      data.reset = data.loggedIn === loggedIn ? false : true;
      dispatch(fetchStorySuccess(data));
      return { body: data.story.body, title: data.story.title, description: data.story.description };
    }
    return dispatch(fetchStoryFail(data));
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return dispatch(
      fetchStoryFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
