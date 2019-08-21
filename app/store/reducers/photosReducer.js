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
        error: undefined,
      };
    case Actions.fetchHomePageFail:
      return {
        ...state,
        data: [],
        error: payload.error,
      };
    case Actions.fetchPhotosSuccess:
      return {
        ...state,
        data: payload.photos,
        error: undefined,
      };
    case Actions.fetchPhotosFail:
      return {
        ...state,
        error: payload.error,
        data: [],
      };
    case Actions.likePhotosSuccess: {
      const data = state.data.map(photo => {
        if (photo.id === payload.photoId) {
          return {
            ...photo,
            isLiked: true,
          };
        }
        return photo;
      });
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.likePhotosFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.dislikePhotosSuccess: {
      const data = state.data.map(photo => {
        if (photo.id === payload.photoId) {
          return {
            ...photo,
            isLiked: false,
          };
        }
        return photo;
      });
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.dislikePhotosFail:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default photosReducer;
