import Actions from '../actions';

const storiesReducer = (
  state = {
    data: [],
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchHomePageSuccess:
      return {
        ...state,
        data: payload.stories,
        error: undefined,
      };
    case Actions.fetchHomePageFail:
      return {
        ...state,
        data: [],
        error: payload.error,
      };
    case Actions.fetchStoriesSuccess:
      return {
        ...state,
        data: payload.stories,
        error: undefined,
      };
    case Actions.fetchStoriesFail:
      return {
        ...state,
        data: [],
        error: payload.error,
      };
    default:
      return state;
  }
};

export default storiesReducer;
