import store from '../utils/store';
import emitter from '../utils/emitter';

/**
 * Holds the current user and its info.
 * Puts it inside localstorage to mimic some back-end persistency.
 */
const currentUserStore = {
  set(id) {
    store.set('currentUser', id);
    emitter.emit('store.currentuser.change', id);
    return id;
  },

  get() {
    return store.get('currentUser');
  },
};

export default currentUserStore;
