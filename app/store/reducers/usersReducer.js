import Actions from '../actions';

const usersReducer = (
  state = {
    data: [],
    storiesCount: 0,
    photosCount: 0,
    error: undefined,
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.fetchUsersSuccess:
      return {
        data: payload.users,
        storiesCount: payload.storiesCount,
        photosCount: payload.photosCount,
        error: undefined,
      };
    case Actions.fetchUsersFail:
      return {
        data: [],
        storiesCount: 0,
        photosCount: 0,
        error: { status: 500, message: payload.error },
      };
    case Actions.changeUserRoleSuccess: {
      const data = state.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === payload.userId) {
          if (data[i].role === 'Admin') data[i].role = 'Reader';
          else data[i].role = 'Admin';
          break;
        }
      }
      return {
        data,
        storiesCount: state.storiesCount,
        photosCount: state.photosCount,
        error: undefined,
      };
    }
    case Actions.changeUserRoleFail:
      return {
        data: state.data,
        photosCount: state.photosCount,
        storiesCount: state.storiesCount,
        error: { message: payload.error },
      };
    default:
      return state;
  }
};

export default usersReducer;
