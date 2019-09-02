import Actions from '../actions';

const aboutReducer = (
  state = {
    data: '',
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchAboutSuccess:
      return {
        ...state,
        data: payload.about,
        error: undefined,
      };
    case Actions.fetchAboutFail:
      return {
        ...state,
        data: '',
        error: payload.error,
      };
    default:
      return state;
  }
};

export default aboutReducer;
