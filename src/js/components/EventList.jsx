import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultLock, defaultUnlock } from '../utils/variables';

const EventList = ({ events, doors, users }) => (
  <ul className="styled-list">
    {events.map((event) => {
      const statusClasses = classNames('styled-list__status', {
        't-green': event.status === 'OK',
        't-red': event.status === 'KO',
      });

      const doorEvent = doors.find((door) => event.doorId === door.id);
      const userEvent = users.find((user) => event.userId === user.id);

      return (
        <li key={event.id} className="styled-list__item">
          <img
            src={event.action === 'open' ? defaultUnlock : defaultLock}
            className="styled-list__lock"
            height="30px"
            width="30px"
            alt={event.action === 'open' ? 'Lock open' : 'Lock closed'}
          />
          <div className="w-50">
            <span className="d-block">{`${userEvent.firstName} ${userEvent.lastName}`}</span>
            <span className="d-block t-3 t-grey">{doorEvent.name}</span>
          </div>
          <small className={statusClasses}>{event.status}</small>
        </li>
      );
    })}
  </ul>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  doors: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

export default EventList;
