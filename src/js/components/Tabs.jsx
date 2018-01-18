import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../utils/funcs';

/**
 * A simple Tabs component.
 * @example

    <Tabs activeKey={activeKey}>
      <Tab>First tab</Tab>
      <Tab>Second tab</Tab>
      <Tab>Third tab</Tab>
    </Tabs>
    { activeKey === 0 && <div>First tab content</div> }
    { activeKey === 1 && <div>Second tab content</div> }
    { activeKey === 2 && <div>Third tab content</div> }

 */
class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: noop,
  };

  constructor(props) {
    super(props);

    const { activeKey, defaultActiveKey } = this.props;
    let currentActiveKey = defaultActiveKey;

    if ('activeKey' in this.props) {
      currentActiveKey = activeKey;
    }

    this.state = {
      activeKey: currentActiveKey,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({ activeKey: nextProps.activeKey });
    }
  }

  onClick(key) {
    const { activeKey } = this.state;
    this.setActiveKey(activeKey === key ? null : activeKey);
  }

  getTabs() {
    const { activeKey } = this.state;
    const { children } = this.props;
    const newChildren = [];

    React.Children.forEach(children, (child, index) => {
      if (!child) return;

      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      const { disabled, children } = child.props;
      const isActive = activeKey === key;

      const props = {
        key,
        children,
        isActive,
        onTabClick: disabled ? null : () => this.onClick(key),
      };

      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
  }

  setActiveKey(activeKey) {
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey });
    }
    this.props.onChange(activeKey);
  }

  render() {
    const { onChange, defaultActiveKey, activeKey, className, ...others } = this.props;
    const classes = classNames('nav', 'nav__tabs', 'nav--block', className);
    return (
      <ul className={classes} {...others} role="tablist">
        {this.getTabs()}
      </ul>
    );
  }
}

export default Tabs;
