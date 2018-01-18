import axios from 'axios';

import eventsStore from '../stores/eventsStore';

import { delay } from '../utils/funcs';
import { eventsEndpoint } from '../utils/variables';

/**
 * Used to fetch the events from json.
 */
const eventsService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(eventsEndpoint).then((response) => {
        if (response.data && response.data.events) {
          resolve(response.data.events);
        } else {
          reject(new Error('Error while fetching events'));
        }
      });
    });
  },

  remove(identifier) {
    return delay(500).then(() => eventsStore.remove(identifier));
  },
};

export default eventsService;
