import store from 'store';
import emitter from '../utils/emitter';

/**
 * Holds the current user and its info.
 * Puts it inside localstorage to mimic some back-end persistency.
 */
const currentUserStore = {
  set(user) {
    store.set('currentUser', user);
    emitter.emit('store.currentuser.change', user);
    return user;
  },

  get() {
    return store.get('currentUser');
  },
};

export default currentUserStore;
