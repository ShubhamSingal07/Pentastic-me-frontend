import Actions from '../actions';

const bookmarkReducer = (
  state = {
    data: undefined,
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
        error: payload.error,
      };
    case Actions.deleteBookmarksSuccess: {
      const data = state.data.storyId.filter(id => id !== payload.storyId);
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.deleteBookmarksFail:
      return {
        ...state,
        error: payload.error,
      };
  }
};

export default bookmarkReducer;
