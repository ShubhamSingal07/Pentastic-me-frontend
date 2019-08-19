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
    default:
      return state;
  }
};

export default authReducer;
