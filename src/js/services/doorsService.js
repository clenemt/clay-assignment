import axios from 'axios';

import doorsStore from '../stores/doorsStore';
import eventsStore from '../stores/eventsStore';
import currentUserStore from '../stores/currentUserStore';

import { delay } from '../utils/funcs';

const endpoint = '/assets/doors.json';

/**
 * Used to fetch the doors from json.
 * Also mimic some kind of delay for some better UX.
 */
const doorsService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(endpoint).then((response) => {
        if (response.data && response.data.doors) {
          resolve(response.data.doors);
        } else {
          reject(new Error('Error while fetching doors'));
        }
      });
    });
  },

  edit(door) {
    return delay(500).then(() => doorsStore.edit(door));
  },

  unlock(door) {
    const currentUser = currentUserStore.get();
    const data = {
      doorId: door.id,
      userId: currentUser.id,
      action: 'open',
    };

    return delay(1000)
      .then(() => {
        doorsStore.edit(Object.assign(door, { status: 'open' }));
        eventsStore.add(Object.assign(data, { status: 'OK' }));
      })
      .catch(() => {
        eventsStore.add(Object.assign(data, { status: 'KO' }));
      });
  },

  lock(door) {
    const currentUser = currentUserStore.get();
    const data = {
      doorId: door.id,
      userId: currentUser.id,
      action: 'close',
    };

    return delay(1000)
      .then(() => {
        doorsStore.edit(Object.assign(door, { status: 'close' }));
        eventsStore.add(Object.assign(data, { status: 'OK' }));
      })
      .catch(() => {
        eventsStore.add(Object.assign(data, { status: 'KO' }));
      });
  },
};

export default doorsService;
