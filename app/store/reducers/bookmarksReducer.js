import Actions from '../actions';

const bookmarkReducer = (
  state = {
    data: [],
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchBookmarksSuccess:
      return {
        ...state,
        data: payload.stories,
        error: undefined,
      };
    case Actions.fetchBookmarksFail:
      return {
        ...state,
        data: undefined,
        error: { status: 500, message: payload.error },
      };
    case Actions.deleteBookmarksSuccess: {
      const data = state.data.filter(({ _id }) => _id !== payload.storyId);
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.deleteBookmarksFail:
      return {
        ...state,
        error: { message: payload.error },
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
