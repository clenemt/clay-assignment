import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from './Button';
import authService from '../services/authService';

const Nav = ({ title, backTo }) => (
  <div className="main-nav">
    <div className="container main-nav__wrapper px-2">
      {backTo && (
        <Link to={backTo} className="main-nav__back">
          <span className="main-nav__arrow" />
          Back
        </Link>
      )}
      <h3 className="main-nav__title">{title}</h3>
      <Button variant="secondary sm" onClick={authService.logout}>
        Logout
      </Button>
    </div>
  </div>
);

Nav.propTypes = {
  title: PropTypes.string,
  backTo: PropTypes.string,
};

export default Nav;
