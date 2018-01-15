import userStore from '../stores/userStore';

const authService = {
  login(user) {
    return new Promise(r => setTimeout(r, 500)).then(() =>
      userStore.setUser(user)
    );
  },

  logout() {
    return new Promise(r => setTimeout(r, 500)).then(() =>
      userStore.setUser(null)
    );
  },
};

export default authService;
