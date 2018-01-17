import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import UserDetailPage from './containers/UserDetailPage';
import DoorDetailPage from './containers/DoorDetailPage';
import NotFoundPage from './containers/NotFoundPage';
import TabListPage from './containers/TabListPage';

import emitter from './utils/emitter';
import currentUserStore from './stores/currentUserStore';
import authService from './services/authService';

class App extends React.Component {
  constructor() {
    super();

    // Bind to user store events (mostly login or logout)
    emitter.on('store.currentuser.change', user => this.setState({ user }));

    this.state = {
      // Retrieve previous user if any
      user: currentUserStore.get(),
    };
  }

  onUserLogout = () => {
    authService.logout();
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route
            path="/"
            render={props =>
              this.state.user ? (
                <div>
                  <button onClick={this.onUserLogout}>Logout</button>
                  <Switch>
                    <Route path="/users/:id" component={UserDetailPage} />
                    <Route path="/doors/:id" component={DoorDetailPage} />
                    <Route
                      exact
                      path="/(doors|users|events)?"
                      component={TabListPage}
                    />
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
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
