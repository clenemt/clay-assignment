import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A simple Alert component.
 * @example

    // Variant: danger, warning, info, success
    <Alert variant="danger">Danger alert</Alert>
 */
const Alert = ({ className, children, variant, ...other }) => {
  const alertClass = 'alert';
  const variants = variant && variant.split(' ').map((v) => `${alertClass}--${v}`);
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
