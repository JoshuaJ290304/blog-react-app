import { http } from './http';

export const usersApi = {
  register: (payload) => http.post('/api/users/register', payload),
  login: (payload) => http.post('/api/users/login', payload),
  profile: () => http.get('/api/users/profile'),
};

