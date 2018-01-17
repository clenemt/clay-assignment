import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Alert = props => {
  const { className, children, variant, ...other } = props;

  const alertClass = 'alert';
  const variants =
    variant && variant.split(' ').map(v => `${alertClass}--${v}`);
  const classes = classNames(alertClass, className, variants);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  className: PropTypes.string,
};

Alert.defaultProps = {
  variant: 'info',
};

export default Alert;
