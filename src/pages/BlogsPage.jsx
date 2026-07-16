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
    <div>
      <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
        <h1 className="m-0">Blogs</h1>
        <div className="d-flex gap-2 flex-wrap">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search title/content"
            className="form-control"
            style={{ width: 260 }}
          />
          <input
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            placeholder="Category"
            className="form-control"
            style={{ width: 200 }}
          />
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="form-select"
            style={{ width: 160 }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      <ErrorBox message={error} />

      {loading ? (
        <Loader />
      ) : (
        <div className="row g-3">
          {blogs.map((b) => (
            <div key={b._id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {b.image ? (
                  <img
                    src={b.image}
                    className="card-img-top"
                    alt={b.title}
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                ) : null}
                <div className="card-body">
                  <h5 className="card-title">{b.title}</h5>
                  <div className="text-muted mb-2">{b.category}</div>
                  <p className="card-text">
                    {(b.content || '').slice(0, 160)}
                    {(b.content || '').length > 160 ? '...' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}


