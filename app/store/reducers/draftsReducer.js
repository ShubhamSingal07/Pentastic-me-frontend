import Actions from '../actions';

const draftsReducer = (
  state = {
    data: undefined,
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
        data: undefined,
        error: payload.error,
      };
    case Actions.deleteDraftsSuccess: {
      const data = state.data.filter(draft => draft.id === draftId);
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
  }
};

export default draftsReducer;
