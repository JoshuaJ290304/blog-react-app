import { useEffect, useMemo, useState } from 'react';
import { blogApi } from '../api/blogApi';
import ErrorBox from '../components/ErrorBox';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const params = useMemo(() => {
    const p = { page, limit };
    if (search) p.search = search;
    if (category) p.category = category;
    return p;
  }, [page, limit, search, category]);

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const { data } = await blogApi.listBlogs(params);
        if (ignore) return;
        setBlogs(data?.data || data?.blogs || []);
        const tp = data?.pagination?.totalPages || 1;
        setTotalPages(tp);
      } catch (e) {
        if (ignore) return;
        setError(e?.message || 'Failed to load blogs');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, [params]);

  return (
    <div style={{ padding: 20, textAlign: 'left' }}>
      <h1>Blogs</h1>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search title/content"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e4e7', flex: '1 1 220px' }}
        />
        <input
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          placeholder="Category"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #e5e4e7', flex: '0 0 180px' }}
        />
        <select value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }} style={{ padding: 10, borderRadius: 8 }}>
          {[5,10,20,50].map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>

      <ErrorBox message={error} />

      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {blogs.map((b) => (
            <div key={b._id} style={{ border: '1px solid #e5e4e7', borderRadius: 12, padding: 14 }}>
              <h3 style={{ marginTop: 0 }}>{b.title}</h3>
              <p style={{ marginBottom: 10, color: '#6b6375' }}>{b.category}</p>
              <img src={b.image} alt="" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 10 }} />
              <p style={{ marginTop: 10 }}>{(b.content || '').slice(0, 160)}{(b.content||'').length>160?'...':''}</p>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

