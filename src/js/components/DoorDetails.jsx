import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { defaultDoor } from '../utils/variables';

const DoorDetails = (props) => {
  const { name, location, id, status } = props.door;

  return (
    <div className="details mt-4 pb-2">
      <img src={defaultDoor} className="details__door" alt="Door" />
      <div className="w-100">
        <span className="d-block">{name}</span>
        <small className="details__email d-block">{location}</small>
      </div>
      <Link className="btn btn--unlock" to={`/unlock/${id}`}>
        {status === 'close' ? 'Unlock' : 'Lock'}
      </Link>
    </div>
  );
};

DoorDetails.propTypes = {
  door: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
  }),
};

export default DoorDetails;
