import Actions from '../actions';

const contactReducer = (
  state = {
    data: '',
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchContactSuccess:
      return {
        ...state,
        data: payload.contact,
        error: undefined,
      };
    case Actions.fetchContactFail:
      return {
        ...state,
        data: '',
        error: payload.error,
      };
    default:
      return state;
  }
};

export default contactReducer;
