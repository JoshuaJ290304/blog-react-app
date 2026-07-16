import { useMemo } from 'react';

export default function AppLayout({ children }) {
  const navLinks = useMemo(
    () => [
      { label: 'Blogs', href: '/' },
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Profile', href: '/profile' },
      { label: 'Admin', href: '/admin' },
    ],
    []
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <span className="navbar-brand fw-semibold">Blog App</span>
          <div className="d-flex gap-2">
            {navLinks.map((l) => (
              <a key={l.href} className="btn btn-sm btn-outline-primary" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="container py-4">{children}</div>
    </div>
  );
}

