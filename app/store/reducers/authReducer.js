import Actions from '../actions';

const authReducer = (
  state = {
    loggedIn: false,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.loginSuccess:
      return {
        loggedIn: true,
      };
    case Actions.fetchHomePageSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchStoriesSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchPhotosSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchStorySuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchPhotoSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchAboutSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchContactSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchDraftSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchDraftsSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.fetchBookmarksSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.refreshSuccess: {
      if (payload.reset)
        return {
          loggedIn: payload.loggedIn,
        };
      return state;
    }
    case Actions.refreshFail:
      return {
        loggedIn: false,
      };
    case Actions.logoutSuccess:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
