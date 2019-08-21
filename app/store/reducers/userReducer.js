import Actions from '../actions';

const userReducer = (
  state = {
    data: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.loginSuccess:
      return {
        ...state,
        data: payload.user,
      };
    case Actions.fetchHomePageSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchStoriesSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchPhotosSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchStorySuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
    }
    case Actions.fetchPhotoSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
    }
  }
};
