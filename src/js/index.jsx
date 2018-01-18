import React from 'react';
import { render } from 'react-dom';

import App from './app';

import usersStore from './stores/usersStore';
import doorsStore from './stores/doorsStore';
import eventsStore from './stores/eventsStore';

import usersService from './services/usersService';
import doorsService from './services/doorsService';
import eventsService from './services/eventsService';

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

// If we are launching the app for the first time
// we need to fill in our stores
if (!usersStore.get() || !doorsStore.get() || !eventsStore.get()) {
  Promise.all([
    usersService.getAll().then((users) => usersStore.set(users)),
    doorsService.getAll().then((doors) => doorsStore.set(doors)),
    eventsService.getAll().then((events) => eventsStore.set(events)),
  ]).then(() => renderApp());
} else {
  renderApp();
}
