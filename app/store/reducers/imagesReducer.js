import Actions from '../actions';

const imagesReducer = (
  state = {
    data: [],
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.uploadImageSuccess: {
      const arr = state.data;
      arr.push({ url: payload.image });
      return {
        ...state,
        data: arr,
        error: undefined,
      };
    }
    case Actions.uploadImageFail:
      return {
        ...state,
        data: [],
        error: payload.error,
      };
    default:
      return state;
  }
};

export default imagesReducer;
