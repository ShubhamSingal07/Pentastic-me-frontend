import Actions from '../actions';

const storiesReducer = (
  state = {
    data: [],
    error: undefined,
    pages: 1,
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
        error: { status: 500, message: payload.error },
      };
    case Actions.fetchStoriesSuccess:
      return {
        ...state,
        data: payload.stories,
        pages: payload.pages,
        error: undefined,
      };
    case Actions.fetchStoriesFail:
      return {
        ...state,
        data: [],
        pages: 1,
        error: { status: 500, message: payload.error },
      };
    default:
      return state;
  }
};

export default storiesReducer;
