export default function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div style={{ padding: 12, border: '1px solid #fca5a5', background: '#fee2e2', color: '#991b1b', borderRadius: 8 }}>
      {message}
    </div>
  );
}

