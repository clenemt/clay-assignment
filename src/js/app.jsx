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
import userStore from './stores/userStore';
import authService from './services/authService';

class App extends React.Component {
  constructor() {
    super();
    // Bind to user store events (mostly login or logout)
    emitter.on('store.user.change', user => this.setState({ user }));

    this.state = {
      user: userStore.getUser(),
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
