import store from 'store';
import emitter from '../utils/emitter';

/**
 * Holds the doors once fetch from the json.
 * Puts them inside localstorage to mimic some back-end persistency.
 */
const doorsStore = {
  set(doors) {
    store.set('doors', doors);
    emitter.emit('store.doors.change', doors);
  },

  get(identifier) {
    const doors = store.get('doors');
    return typeof identifier !== 'undefined'
      ? doors.find((door) => door.id === identifier || door.name === identifier)
      : doors;
  },

  edit(door) {
    const doors = store.get('doors');
    const oldDoor = doors.find((dor) => dor.id === door.id || dor.name === door.name);

    if (oldDoor) {
      Object.assign(oldDoor, door);
    } else {
      const newId = doors[doors.length - 1].id + 1;
      const newDoor = Object.assign({ id: newId }, door);
      doors.push(newDoor);
    }

    doorsStore.set(doors);
  },

  remove(id) {
    const doors = store.get('doors');
    const index = doors.findIndex((door) => door.id === id);

    if (index !== -1) {
      doors.splice(index, 1);
      doorsStore.set(doors);
    }
  },
};

export default doorsStore;
