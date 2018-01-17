import React from 'react';
import { render } from 'react-dom';

import App from './app';
import usersStore from './stores/usersStore';
import usersService from './services/usersService';

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

// If we are launching the app for the first time
// we need to fill in our stores
if (!usersStore.get()) {
  usersService.getAll().then(users => {
    usersStore.set(users);
    renderApp();
  });
} else {
  renderApp();
}
