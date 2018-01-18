import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { defaultDoor } from '../utils/variables';

const DoorList = ({ doors }) => (
  <ul className="styled-list">
    {doors.map((door) => {
      const statusClasses = classNames('styled-list__status', {
        't-green': door.status === 'open',
        't-red': door.status === 'close',
      });

      return (
        <li key={door.id}>
          <Link to={`/doors/${door.id}`} className="styled-list__item">
            <img
              src={defaultDoor}
              className="styled-list__door"
              alt="Door"
              height="60px"
              width="60px"
            />
            <div className="w-50">
              <span className="d-block">{door.name}</span>
              <span className="d-block t-3 t-grey">{door.mode}</span>
            </div>
            <small className={statusClasses}>{door.status}</small>
            <span className="styled-list__arrow" />
          </Link>
        </li>
      );
    })}
  </ul>
);

DoorList.propTypes = {
  doors: PropTypes.arrayOf(PropTypes.object),
};

export default DoorList;
