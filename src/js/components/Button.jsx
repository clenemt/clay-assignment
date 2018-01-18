import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A simple Button component.
 * @example

    // Variant: primary, secondary, unlock
    <Button type="submit" variant="primary">My Button</Button>
 */
const Button = ({ className, children, disabled, variant, loading, type, ...other }) => {
  const buttonClass = 'btn';
  const variants = variant && variant.split(' ').map((v) => `${buttonClass}--${v}`);

  const classes = classNames(buttonClass, className, variants, {
    [`${buttonClass}--disabled`]: disabled,
    [`${buttonClass}--loading`]: loading,
  });

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled !== 'undefined' ? disabled : loading}
      {...other}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
