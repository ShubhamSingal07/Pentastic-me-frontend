import Actions from '../actions';

const photoReducer = (
  state = {
    data: {},
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchPhotoSuccess:
      return {
        ...state,
        data: payload.photo,
        error: undefined,
      };
    case Actions.fetchPhotoFail:
      return {
        ...state,
        data: {},
        error: payload.error,
      };
    case Actions.likePhotoSuccess: {
      const data = state.data;
      data.isLiked = true;
      data.likes.total = data.likes.total + 1;
      return {
        data,
        error: undefined,
      };
    }
    case Actions.likePhotoFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.dislikePhotoSuccess: {
      const data = state.data;
      data.isLiked = false;
      data.likes.total = data.likes.total - 1;
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.dislikePhotoFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.addCommentSuccess: {
      const data = state.data;
      data.comments.total += 1;
      data.comments.comment.push({
        userId: payload.userId,
        name: payload.name,
        _id: payload._id,
        body: payload.comment,
      });
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.addCommentFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.editCommentSuccess: {
      const data = state.data;
      data.comments.comment = data.comments.comment.map(comment => {
        if (comment._id === payload.commentId)
          return {
            ...comment,
            body: payload.comment,
          };
        return comment;
      });

      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.editCommentFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.deleteCommentSuccess: {
      const data = state.data;
      data.comments.total -= 1;
      data.comments.comment = data.comments.comment.filter(comment => comment._id !== payload.commentId);
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.deleteCommentFail:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default photoReducer;
