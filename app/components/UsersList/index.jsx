import React from 'react';
import Table from 'react-bootstrap/Table';

import UsersItem from './UsersItem';

import './style.scss';

const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      <Table responsive hover size="sm">
        <thead>
          <tr>
            <th className="pl-5">Username</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UsersItem user={user} key={user._id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
