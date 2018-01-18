import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { defaultAvatar } from '../utils/variables';

const UserList = ({ users }) => (
  <ul className="styled-list">
    {users.map((user) => (
      <li key={user.id}>
        <Link to={`/users/${user.id}`} className="styled-list__item">
          <img
            src={user.image || defaultAvatar}
            className="styled-list__avatar"
            alt="User avatar"
            height="60px"
            width="60px"
          />
          <span className="styled-list__fullname">
            {user.firstName} {user.lastName}
          </span>
          <small className="styled-list__email">{user.email}</small>
          <span className="styled-list__arrow" />
        </Link>
      </li>
    ))}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserList;
