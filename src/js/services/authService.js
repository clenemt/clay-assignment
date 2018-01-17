import usersStore from '../stores/usersStore';
import currentUserStore from '../stores/currentUserStore';
import { delay } from '../utils/funcs';

const authService = {
  login(username, password) {
    return delay(500).then(() => {
      const user = usersStore.get(username);

      // Very dumb check
      if (user && user.password === password) {
        currentUserStore.set(user);
      } else {
        throw new Error('Login failed');
      }
    });
  },

  logout() {
    return delay(500).then(() => currentUserStore.set(null));
  },
};

export default authService;
