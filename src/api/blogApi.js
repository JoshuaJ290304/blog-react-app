import { http } from './http';

export const blogApi = {
  listBlogs: (params) => http.get('/api/blog/view', { params }),
  getBlog: (id) => http.get(`/api/blog/view/${id}`),
  createBlog: (formData) => http.post('/api/blog/create', formData),
  updateBlog: (id, formData) => http.put(`/api/blog/update/${id}`, formData),
  deleteBlog: (id) => http.delete(`/api/blog/delete/${id}`),

  addComment: (blogId, payload) => http.post(`/api/blog/${blogId}/comments`, payload),
  listComments: (blogId) => http.get(`/api/blog/${blogId}/comments`),

  like: (blogId) => http.post(`/api/blog/${blogId}/like`),
  unlike: (blogId) => http.post(`/api/blog/${blogId}/unlike`),
};

