import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

import userIcon from '../../../../public/icons/user.svg';
import * as Actions from '../../../actions';

class UsersItem extends React.Component {
  state = {
    isAdmin: this.props.user.role === 'Admin',
  };

  render() {
    const { isAdmin } = this.state;
    const { user, changeUserRole, data } = this.props;

    const handleCheckboxClick = () => {
      this.setState({ isAdmin: !isAdmin });
      changeUserRole({ userId: user._id });
    };

    if (data._id !== user._id) {
      return (
        <tr>
          <td className="pl-3">
            <img className="rounded-circle" src={user.thumbnail || userIcon} height="30px" width="30px" />
            <span className="pl-2">{user.username}</span>
          </td>
          <td>
            <span className="admin-checkbox pl-2">
              <input type="checkbox" name="isAdmin" defaultChecked={isAdmin} onClick={handleCheckboxClick} />
            </span>
          </td>
        </tr>
      );
    }
    return <tr />;
  }
}

const mapStateToProps = ({ user }) => ({
  data: user.data,
});

const mapDispatchToProps = dispatch => ({
  changeUserRole: payload => dispatch(Actions.changeUserRole(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersItem);
