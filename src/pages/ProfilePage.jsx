import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 20, maxWidth: 680, margin: '0 auto', textAlign: 'left' }}>
      <h1>Profile</h1>
      <pre style={{ background: '#f4f3ec', padding: 12, borderRadius: 10 }}>{JSON.stringify(user, null, 2)}</pre>
      <button
        type="button"
        onClick={logout}
        style={{ padding: 12, borderRadius: 10, border: 0, background: '#fee2e2', cursor: 'pointer', marginTop: 12 }}
      >
        Logout
      </button>
    </div>
  );
}

