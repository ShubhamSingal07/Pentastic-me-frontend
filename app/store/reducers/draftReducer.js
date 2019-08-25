import Actions from '../../store/actions';

const draftReducer = (
  state = {
    data: undefined,
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
        data: undefined,
        error: payload.error,
      };
  }
};

export default draftReducer;
