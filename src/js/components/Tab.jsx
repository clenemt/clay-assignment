import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../utils/funcs';

class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onTabClick: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
    onTabClick: noop,
  };

  handleTabClick = () => {
    this.props.onTabClick();
  };

  render() {
    const { id, children, isActive, disabled } = this.props;

    const tabClass = 'nav__item';

    const classes = classNames(tabClass, {
      [`${tabClass}--disabled`]: disabled,
      [`${tabClass}--active`]: isActive,
    });

    return (
      <li
        className={classes}
        onClick={this.handleTabClick}
        role="tab"
        tabIndex={0}
        id={id}
        disabled={disabled}
      >
        {children}
      </li>
    );
  }
}

export default Tab;
