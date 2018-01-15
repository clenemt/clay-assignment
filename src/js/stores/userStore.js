import store from 'store';
import emitter from '../utils/emitter';

let user = store.get('user');

const userStore = {
  setUser(usr) {
    user = usr;
    emitter.emit('store.user.change', user);
  },

  getUser() {
    return user;
  },
};

export default userStore;
