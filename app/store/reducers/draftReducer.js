import Actions from '../actions';

const draftReducer = (
  state = {
    data: {},
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchDraftSuccess:
      return {
        ...state,
        data: payload.draft,
        error: undefined,
      };
    case Actions.fetchDraftFail:
      return {
        ...state,
        data: {},
        error: payload.error,
      };
    default:
      return state;
  }
};

export default draftReducer;
