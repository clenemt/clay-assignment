import store from 'store';
import emitter from '../utils/emitter';

const userStore = {
  set(users) {
    store.set('users', users);
    emitter.emit('store.users.change', users);
  },

  get(identifier) {
    const users = store.get('users');
    return identifier
      ? users.find(
          user => user.id === identifier || user.username === identifier
        )
      : users;
  },

  add(user) {
    const users = store.get('users');
    const newUser = Object.assign({}, user);

    users.push(newUser);
    store.set('users', users);
    emitter.emit('store.users.add', newUser);
  },

  remove(id) {
    const users = store.get('users');
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
      const removedUser = users.splice(index, 1);
      store.set('users', users);
      emitter.emit('store.users.remove', removedUser);
    }
  },
};

export default userStore;
