import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ErrorBox from '../components/ErrorBox';

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: '0 auto', textAlign: 'left' }}>
      <h1>Register</h1>
      <ErrorBox message={error} />
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e4e7' }} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e4e7' }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e4e7' }} />
        <button
          type="button"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError('');
            try {
              await register({ name, email, password });
              window.location.href = '/';
            } catch (e) {
              setError(e?.message || 'Registration failed');
            } finally {
              setLoading(false);
            }
          }}
          style={{ padding: 12, borderRadius: 10, border: 0, background: 'rgba(170, 59, 255, 0.25)', cursor: 'pointer' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
}

