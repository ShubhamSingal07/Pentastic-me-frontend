import Actions from '../actions';

const storyReducer = (
  state = {
    data: undefined,
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
        data: undefined,
        error: payload.error,
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
        error: payload.error,
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
        error: payload.error,
      };
  }
};

export default storyReducer;
