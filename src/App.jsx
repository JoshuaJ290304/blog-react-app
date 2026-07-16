import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import BlogsPage from './pages/BlogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function RouteShim() {
  const [path, setPath] = useState(window.location.pathname);

  const isActive = (p) => path === p;

  const linkStyle = (p) => ({
    color: 'inherit',
    textDecoration: 'none',
    opacity: isActive(p) ? 1 : 0.75,
    fontWeight: isActive(p) ? 700 : 500,
    padding: '8px 10px',
    borderRadius: 10,
    border: isActive(p) ? '1px solid rgba(170, 59, 255, 0.5)' : '1px solid transparent',
    background: isActive(p) ? 'rgba(170, 59, 255, 0.12)' : 'transparent',
  });


  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const nav = (
    <div style={{ padding: 14, borderBottom: '1px solid #e5e4e7', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
      <div style={{ fontWeight: 700 }}>Blog App</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Blogs</a>
        <a href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</a>
        <a href="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</a>
        <a href="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</a>
        <a href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</a>
      </div>
    </div>
  );

  if (path === '/login') return (
    <>
      {nav}
      <LoginPage />
    </>
  );

  if (path === '/register') return (
    <>
      {nav}
      <RegisterPage />
    </>
  );

  if (path === '/profile') return (
    <>
      {nav}
      <ProfilePage />
    </>
  );

  if (path === '/admin') return (
    <>
      {nav}
      <AdminDashboardPage />
    </>
  );

  return (
    <>
      {nav}
      <BlogsPage />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouteShim />
    </AuthProvider>
  );
}

