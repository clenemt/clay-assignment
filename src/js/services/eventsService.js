import axios from 'axios';

import { delay } from '../utils/funcs';
import eventsStore from '../stores/eventsStore';

const endpoint = '/assets/events.json';

/**
 * Used to fetch the events from json.
 */
const eventsService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(endpoint).then((response) => {
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
