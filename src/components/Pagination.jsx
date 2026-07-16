export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  for (let p = 1; p <= totalPages; p++) pages.push(p);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #e5e4e7',
            background: p === page ? 'rgba(170, 59, 255, 0.1)' : 'transparent',
            cursor: 'pointer',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

