import Actions from '../actions';

const photosReducer = (
  state = {
    data: [],
    error: undefined,
    pages: 1,
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
        error: { status: 500, message: payload.error },
      };
    case Actions.fetchPhotosSuccess:
      return {
        ...state,
        data: payload.photos,
        pages: payload.pages,
        error: undefined,
      };
    case Actions.fetchPhotosFail:
      return {
        ...state,
        error: { status: 500, message: payload.error },
        pages: 1,
        data: [],
      };
    case Actions.likePhotosSuccess: {
      const data = state.data.map(photo => {
        if (photo._id === payload.photoId) {
          return {
            ...photo,
            isLiked: true,
            likes: photo.likes + 1,
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
        error: { message: payload.error },
      };
    case Actions.dislikePhotosSuccess: {
      const data = state.data.map(photo => {
        if (photo._id === payload.photoId) {
          return {
            ...photo,
            isLiked: false,
            likes: photo.likes - 1,
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
        error: { message: payload.error },
      };
    default:
      return state;
  }
};

export default photosReducer;
