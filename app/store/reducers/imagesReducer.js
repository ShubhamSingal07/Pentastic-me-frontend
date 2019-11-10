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
      const arr = [...state.data, ...payload.image];
      return {
        ...state,
        data: arr,
        error: undefined,
      };
    }
    case Actions.uploadImageFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.refreshSuccess:
      return {
        data: [],
        error: undefined,
      };
    case Actions.sortImages:
      return {
        data: payload.data,
        error: undefined,
      };
    case Actions.deleteImage: {
      const data = state.data;
      data.splice(payload.index, 1);
      return {
        data,
        error: undefined,
      };
    }
    case Actions.fetchAboutSuccess: {
      const image = payload.about.aboutBackgroundImage ? [{ url: payload.about.aboutBackgroundImage }] : [];
      return {
        data: image,
        error: undefined,
      };
    }
    default:
      return state;
  }
};

export default imagesReducer;
