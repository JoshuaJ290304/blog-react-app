import { http } from './http';

export const adminApi = {
  stats: () => http.get('/api/admin/stats'),
  users: () => http.get('/api/admin/users'),
  blogs: () => http.get('/api/admin/blogs'),
};

