import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import BlogsPage from './pages/BlogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import AppLayout from './components/AppLayout.jsx';

function RouteShim() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (path === '/login') return <LoginPage />;
  if (path === '/register') return <RegisterPage />;
  if (path === '/profile') return <ProfilePage />;
  if (path === '/admin') return <AdminDashboardPage />;
  return <BlogsPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <RouteShim />
      </AppLayout>
    </AuthProvider>
  );
}


