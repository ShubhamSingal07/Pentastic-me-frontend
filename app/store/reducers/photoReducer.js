import Actions from '../actions';

export const photoReducer = (
  state = {
    data: undefined,
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
        data: undefined,
        error: payload.error,
      };
    case Actions.likePhotoSuccess: {
      const data = state.data;
      data.isLiked = true;
      data.likes = data.likes + 1;
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.likePhotoFail:
      return {
        ...state,
        error: payload.error,
      };
    case Actions.addCommentSuccess: {
      const data = state.data;
      data.comments.total += 1;
      data.comments.comment = state.data.comments.comment.push({
        userId: payload.userId,
        name: payload.name,
        commentId: payload.commentId,
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
      data.comments.comment = state.data.comments.comment.map(comment => {
        if (comment.commentId === payload.commentId)
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
      data.comments.comment = data.comments.comment.filter(comment => comment.commentId !== payload.commentId);
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
  }
};
