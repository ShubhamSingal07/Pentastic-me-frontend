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
    case Actions.fetchStoriesSuccess:
      return {
        loggedIn: payload.loggedIn,
      };
    default:
      return state;
  }
};

export default authReducer;
