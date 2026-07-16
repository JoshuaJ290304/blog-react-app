import { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';
import ErrorBox from '../components/ErrorBox';
import Loader from '../components/Loader';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const { data } = await adminApi.stats();
        if (ignore) return;
        setStats(data?.data || null);
      } catch (e) {
        if (ignore) return;
        setError(e?.response?.data?.message || e?.message || 'Failed to load admin stats');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: '0 auto', textAlign: 'left' }}>
      <h1>Admin Dashboard</h1>
      <ErrorBox message={error} />
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))', gap: 12, marginTop: 12 }}>
          <div style={{ border: '1px solid #e5e4e7', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#6b6375' }}>Users</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{stats?.usersCount ?? '-'}</div>
          </div>
          <div style={{ border: '1px solid #e5e4e7', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#6b6375' }}>Blogs</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{stats?.blogsCount ?? '-'}</div>
          </div>
          <div style={{ border: '1px solid #e5e4e7', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#6b6375' }}>Comments</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{stats?.commentsCount ?? '-'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

