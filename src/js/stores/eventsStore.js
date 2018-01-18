import store from '../utils/store';
import emitter from '../utils/emitter';

/**
 * Holds the events once fetch from the json.
 * Puts them inside localstorage to mimic some back-end persistency.
 */
const eventsStore = {
  set(events) {
    store.set('events', events);
    emitter.emit('store.events.change', events);
  },

  get(identifier) {
    const events = store.get('events');
    return typeof identifier !== 'undefined'
      ? events.find((event) => event.id === identifier)
      : events;
  },

  add(event) {
    const events = store.get('events');
    const lastEvent = events[events.length - 1];
    const newId = lastEvent && lastEvent.id ? lastEvent.id + 1 : events.length + 1;
    const newEvent = Object.assign({ id: newId }, event);
    events.push(newEvent);
    eventsStore.set(events);
  },

  remove(identifier) {
    const events = store.get('events');

    if (typeof identifier !== 'undefined') {
      const index = events.findIndex((event) => event.id === identifier);
      if (index !== -1) {
        events.splice(index, 1);
        eventsStore.set(events);
      }
    } else {
      eventsStore.set([]);
    }
  },
};

export default eventsStore;
