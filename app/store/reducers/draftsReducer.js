import Actions from '../actions';

const draftsReducer = (
  state = {
    data: [],
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchDraftsSuccess:
      return {
        ...state,
        data: payload.drafts,
        error: undefined,
      };
    case Actions.fetchDraftsFail:
      return {
        ...state,
        data: [],
        error: { status: 500, message: payload.error },
      };
    case Actions.deleteDraftsSuccess: {
      const data = state.data.filter(draft => draft._id !== payload.draftId);
      return {
        ...state,
        data,
        error: undefined,
      };
    }
    case Actions.deleteDraftsFail:
      return {
        ...state,
        error: { message: payload.error },
      };
    default:
      return state;
  }
};

export default draftsReducer;
