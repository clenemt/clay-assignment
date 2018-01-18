import React from 'react';
import PropTypes from 'prop-types';

import { defaultAvatar } from '../utils/variables';

const UserDetails = (props) => {
  const { image, firstName, lastName, email } = props.user;

  return (
    <div className="details mt-4 pb-2">
      <img src={image || defaultAvatar} className="details__avatar" alt="User avatar" />
      <div className="">
        <span className="d-block">
          {firstName} {lastName}
        </span>
        <small className="details__email d-block">{email}</small>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    email: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
  }),
};

export default UserDetails;
