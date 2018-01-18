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
import currentUserStore from '../stores/currentUserStore';

import doorsService from '../services/doorsService';
import eventsService from '../services/eventsService';

import { upperCase } from '../utils/funcs';

/**
 * The main tab layout.
 * Controls the list behind.
 */
class TabListPage extends React.Component {
  constructor(props) {
    super(props);

    const currentUserId = currentUserStore.get();
    const users = usersStore.get();
    const currentUser = users.find((user) => currentUserId === user.id);
    this.isAdmin = currentUser && currentUser.isAdmin;

    this.state = {
      users,
      doors: doorsService.getDoorsForUser(),
      events: eventsService.getEventsForUser(),
    };
  }

  onClearEvents = () => {
    eventsService.remove().then(() => this.setState({ events: [] }));
  };

  pathToKey(path) {
    let key =
      ['users', 'doors', 'events'].find((key) => key === path.slice(1).toLowerCase()) || 'users';
    if (key === 'users' && !this.isAdmin) key = 'doors';
    return key;
  }

  render() {
    const path = this.props.location.pathname;
    const activeKey = this.pathToKey(path);
    const title = upperCase(activeKey);

    return (
      <>
        <Nav title={title} />
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
