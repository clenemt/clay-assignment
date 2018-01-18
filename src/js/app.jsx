import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import UnlockPage from './containers/UnlockPage';
import TabListPage from './containers/TabListPage';
import NotFoundPage from './containers/NotFoundPage';
import UserDetailPage from './containers/UserDetailPage';
import DoorDetailPage from './containers/DoorDetailPage';

import emitter from './utils/emitter';

import currentUserStore from './stores/currentUserStore';

import { baseUrl } from './utils/variables';

/*
 * Holds the routing of our app.
 */
class App extends React.Component {
  constructor() {
    super();

    // Bind to user store events (mostly login or logout)
    emitter.on('store.currentuser.change', (user) => this.setState({ user }));

    this.state = {
      // Retrieve previous user if any
      user: currentUserStore.get(),
    };
  }

  render() {
    return (
      <Router basename={baseUrl}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route
            path="/"
            render={(props) =>
              this.state.user != null ? (
                <Switch>
                  <Route path="/users/:id" component={UserDetailPage} />
                  <Route path="/doors/:id" component={DoorDetailPage} />
                  <Route path="/unlock/:id" component={UnlockPage} />
                  <Route exact path="/(doors|users|events)?" component={TabListPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
