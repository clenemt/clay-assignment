import axios from 'axios';

import doorsStore from '../stores/doorsStore';
import usersStore from '../stores/usersStore';
import eventsStore from '../stores/eventsStore';
import currentUserStore from '../stores/currentUserStore';

import { delay } from '../utils/funcs';
import { doorsEndpoint } from '../utils/variables';

/**
 * Used to fetch the doors from json.
 * Also mimic some kind of delay for some better UX.
 */
const doorsService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(doorsEndpoint).then((response) => {
        if (response.data && response.data.doors) {
          resolve(response.data.doors);
        } else {
          reject(new Error('Error while fetching doors'));
        }
      });
    });
  },

  getDoorsForUser() {
    const currentUserId = currentUserStore.get();
    const users = usersStore.get();
    const currentUser = users.find((user) => currentUserId === user.id);
    const doors = doorsStore.get();
    const userDoors = [];

    // Bypass for admin users to see all doors
    if (currentUser.isAdmin) return doors;

    // Break early if no doors
    if (!currentUser.doors) return [];

    currentUser.doors.forEach((doorId) => {
      const door = doors.find((door) => door.id === doorId);
      if (door) userDoors.push(door);
    });

    return userDoors;
  },

  edit(door) {
    const currentUserId = currentUserStore.get();
    const users = usersStore.get();
    const currentUser = users.find((user) => currentUserId === user.id);

    return delay(500).then(() => {
      const doorUsers = door.users || [];
      if (!doorUsers.find((userId) => currentUser.id === userId)) {
        doorUsers.push(currentUser.id);
      }

      const newDoor = doorsStore.edit(Object.assign({ users: doorUsers }, door));

      const userDoors = currentUser.doors || [];
      if (!userDoors.find((doorId) => newDoor.id === doorId)) {
        userDoors.push(newDoor.id);
      }

      usersStore.edit(Object.assign({ doors: userDoors }, currentUser));
    });
  },

  unlock(door) {
    const currentUser = currentUserStore.get();
    const data = {
      doorId: door.id,
      userId: currentUser,
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
      userId: currentUser,
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
