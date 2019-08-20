import Actions from '../actions';

const photosReducer = (
  state = {
    data: [],
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchHomePageSuccess:
      return {
        ...state,
        data: payload.photos,
      };
    case Actions.fetchHomePageFail:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default photosReducer;
