import store from 'store';
import emitter from '../utils/emitter';

/**
 * Holds the users once fetch from the json.
 * Puts them inside localstorage to mimic some back-end persistency.
 */
const userStore = {
  set(users) {
    store.set('users', users);
    emitter.emit('store.users.change', users);
  },

  get(identifier) {
    const users = store.get('users');
    return typeof identifier !== 'undefined'
      ? users.find((user) => user.id === identifier || user.username === identifier)
      : users;
  },

  edit(user) {
    const users = store.get('users');
    const oldUser = users.find((usr) => usr.id === user.id || usr.username === user.username);

    if (oldUser) {
      Object.assign(oldUser, user);
    } else {
      const newId = users[users.length - 1].id + 1;
      const newUser = Object.assign({ id: newId }, user);
      users.push(newUser);
    }

    userStore.set(users);
  },

  remove(id) {
    const users = store.get('users');
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      userStore.set(users);
    }
  },
};

export default userStore;
