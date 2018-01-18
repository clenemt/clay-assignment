import axios from 'axios';

import usersStore from '../stores/usersStore';

import { delay } from '../utils/funcs';
import { usersEndpoint } from '../utils/variables';

/**
 * Used to fetch the users from json.
 * Also mimic some kind of delay for some better UX.
 */
const usersService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(usersEndpoint).then((response) => {
        if (response.data && response.data.users) {
          resolve(response.data.users);
        } else {
          reject(new Error('Error while fetching users'));
        }
      });
    });
  },

  edit(user) {
    return delay(500).then(() => usersStore.edit(user));
  },
};

export default usersService;
