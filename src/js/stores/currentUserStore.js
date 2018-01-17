import store from 'store';
import emitter from '../utils/emitter';

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
