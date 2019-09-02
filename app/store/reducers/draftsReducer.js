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
        error: payload.error,
      };
    case Actions.fetchDraftsFail:
      return {
        ...state,
        data: [],
        error: payload.error,
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
        error: payload.error,
      };
    default:
      return state;
  }
};

export default draftsReducer;
