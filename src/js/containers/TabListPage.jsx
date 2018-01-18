import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav';
import Tab from '../components/Tab';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import UserList from '../components/UserList';
import DoorList from '../components/DoorList';
import EventList from '../components/EventList';

import usersStore from '../stores/usersStore';
import doorsStore from '../stores/doorsStore';
import eventsStore from '../stores/eventsStore';
import currentUserStore from '../stores/currentUserStore';

import eventsService from '../services/eventsService';

import { upperCase } from '../utils/funcs';

const pathToTitle = (path) => upperCase(path.slice(1)) || 'Users';
const pathToKey = (path) =>
  ['users', 'doors', 'events'].find((key) => key === path.slice(1).toLowerCase()) || 'users';

/**
 * The main tab layout.
 * Controls the list behind.
 */
class TabListPage extends React.Component {
  constructor(props) {
    super(props);

    const currentUser = currentUserStore.get();
    this.isAdmin = currentUser.isAdmin;

    this.state = {
      users: usersStore.get(),
      doors: doorsStore.get(),
      events: eventsStore.get(),
    };
  }

  onClearEvents = () => {
    eventsService.remove().then(() => this.setState({ events: [] }));
  };

  render() {
    const path = this.props.location.pathname;
    const activeKey = pathToKey(path);

    return (
      <>
        <Nav title={pathToTitle(path)} />
        <div className="container px-2">
          <Tabs activeKey={activeKey} className="site__tabs">
            {this.isAdmin && (
              <Tab key="users">
                <Link to="/users">Users</Link>
              </Tab>
            )}
            <Tab key="doors">
              <Link to="/doors">Doors</Link>
            </Tab>
            <Tab key="events">
              <Link to="/events">Events</Link>
            </Tab>
          </Tabs>
          {activeKey === 'users' && (
            <div>
              <div className="t-center t-sm-right mb-3">
                <Link to="/users/new">
                  <Button variant="primary sm">Add a user</Button>
                </Link>
              </div>
              <UserList users={this.state.users} />
            </div>
          )}
          {activeKey === 'doors' && (
            <div>
              <div className="t-center t-sm-right mb-3">
                <Link to="/doors/new">
                  <Button variant="primary sm">Add a door</Button>
                </Link>
              </div>
              <DoorList doors={this.state.doors} />
            </div>
          )}
          {activeKey === 'events' && (
            <div>
              <div className="t-center t-sm-right mb-3">
                <Button variant="primary sm" onClick={this.onClearEvents}>
                  Clear events
                </Button>
              </div>
              <EventList
                events={this.state.events}
                doors={this.state.doors}
                users={this.state.users}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default TabListPage;
