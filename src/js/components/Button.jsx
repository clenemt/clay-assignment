import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
  const {
    className,
    children,
    disabled,
    variant,
    loading,
    type,
    onTouchStart,
    ...other
  } = props;

  const buttonClass = 'btn';
  const variants =
    variant && variant.split(' ').map(v => `${buttonClass}--${v}`);

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
  onTouchStart: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
