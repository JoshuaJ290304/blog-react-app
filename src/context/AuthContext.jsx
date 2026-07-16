import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../api/http';
import { usersApi } from '../api/usersApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
    setLoading(false);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login: async ({ email, password }) => {
        const { data } = await usersApi.login({ email, password });
        if (!data?.status) throw new Error(data?.message || 'Login failed');
        localStorage.setItem('token', data.token);
        const decodedUser = { role: data.role, id: data.id };
        // backend currently returns only token; we keep user null unless you decode elsewhere
        setUser(decodedUser);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(decodedUser));
      },
      register: async ({ name, email, password }) => {
        const { data } = await usersApi.register({ name, email, password });
        if (!data?.status) throw new Error(data?.message || 'Registration failed');
        return data;
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      },
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

