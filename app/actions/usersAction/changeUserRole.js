import Actions from '../../store/actions';

const changeUserRoleSuccess = payload => ({
  type: Actions.changeUserRoleSuccess,
  payload,
});

const changeUserRoleFail = payload => ({
  type: Actions.changeUserRoleFail,
  payload,
});

const URL = process.env.URL;

export const changeUserRole = ({ userId }) => async dispatch => {
  try {
    const response = await fetch(`${URL}/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      data.userId = userId;
      return dispatch(changeUserRoleSuccess(data));
    }
    return dispatch(changeUserRoleFail(data));
  } catch (err) {
    return dispatch(
      changeUserRoleFail({
        error: 'Oops! Looks like something went wrong',
      }),
    );
  }
};
