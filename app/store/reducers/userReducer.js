import Actions from '../actions';

const userReducer = (
  state = {
    data: {},
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
      return state;
    }
    case Actions.fetchPhotoSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchAboutSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchContactSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchDraftSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchDraftsSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.fetchBookmarksSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.logoutSuccess: {
      return {
        data: {},
      };
    }
    case Actions.refreshSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    case Actions.refreshFail:
      return {
        data: {},
      };
    case Actions.fetchUsersSuccess: {
      if (payload.reset)
        return {
          ...state,
          data: payload.user,
        };
      return state;
    }
    default:
      return state;
  }
};

export default userReducer;
