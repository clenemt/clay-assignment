import React from 'react';

class TabListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.location.pathname,
    };
  }

  render() {
    return <div>{this.state.activeTab}</div>;
  }
}

export default TabListPage;
