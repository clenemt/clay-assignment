import axios from 'axios';

const endpoint = '/assets/users.json';

const usersService = {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(endpoint).then(response => {
        if (response.data && response.data.users) {
          resolve(response.data.users);
        } else {
          reject(new Error('Error while fetching users'));
        }
      });
    });
  },
};

export default usersService;
