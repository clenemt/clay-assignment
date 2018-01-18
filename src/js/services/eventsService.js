import axios from 'axios';

import eventsStore from '../stores/eventsStore';
import currentUserStore from '../stores/currentUserStore';

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

  getEventsForUser() {
    const events = eventsStore.get();
    const currentUser = currentUserStore.get();

    // Bypass for admin users to see all events
    if (currentUser.isAdmin) return events;

    return events.filter((event) => event.userId === currentUser.id);
  },

  remove(identifier) {
    return delay(500).then(() => eventsStore.remove(identifier));
  },
};

export default eventsService;
