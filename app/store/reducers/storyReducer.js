import Actions from '../actions';

const storyReducer = (
  state = {
    data: {},
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchStorySuccess:
      return {
        ...state,
        data: payload.story,
        error: undefined,
      };
    case Actions.fetchStoryFail:
      return {
        ...state,
        data: {},
        error: { status: 500, message: payload.error },
      };
    case Actions.clapStorySuccess: {
      const data = {
        ...state.data,
        isLiked: true,
        claps: state.data.claps + 1,
      };
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.clapStoryFail: {
      return {
        ...state,
        error: { message: payload.error },
      };
    }
    case Actions.unclapStorySuccess: {
      const data = {
        ...state.data,
        isLiked: false,
        claps: state.data.claps - 1,
      };
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.unclapStoryFail:
      return {
        ...state,
        error: { message: payload.error },
      };
    case Actions.addBookmarkSuccess: {
      const data = {
        ...state.data,
        isBookmarked: true,
      };
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.addBookmarkFail:
      return {
        ...state,
        error: { message: payload.error },
      };
    case Actions.deleteBookmarkSuccess: {
      const data = {
        ...state.data,
        isBookmarked: false,
      };
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.deleteBookmarkFail:
      return {
        ...state,
        error: { message: payload.error },
      };
    default:
      return state;
  }
};

export default storyReducer;
