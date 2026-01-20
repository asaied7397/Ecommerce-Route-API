import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesApi } from "../api/categories";

export default function HomeCategories({
  title = "Shop by Category",
  subtitle = "Find products faster by browsing categories",
  limit = 0,
  disabled = null,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await categoriesApi.getAll(limit ? { limit } : {});
        const list = data?.data || data?.results || [];
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled)
          setErr(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load categories",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => (cancelled = true);
  }, [limit]);

  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-3">
          <div>
            <h4 className="fw-bold mb-1">{title}</h4>
            <p className="text-muted mb-0">{subtitle}</p>
          </div>

          {disabled ? null : (
            <Link to="/categories" className="btn btn-success btn-sm">
              View all <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
          )}
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-3 p-md-4">
            {loading && (
              <div className="row g-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <div
                      className="border rounded-4 overflow-hidden bg-light"
                      style={{ height: 190 }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!loading && err && (
              <div className="alert alert-danger mb-0">{err}</div>
            )}

            {!loading && !err && items.length === 0 && (
              <div className="alert alert-warning mb-0">
                No categories found.
              </div>
            )}

            {!loading && !err && items.length > 0 && (
              <div className="row g-3">
                {items.map((c) => (
                  <div key={c._id || c.id} className="col-6 col-md-4 col-lg-3">
                    <Link
                      to={`/products?category=${encodeURIComponent(c._id)}`}
                      className="text-decoration-none"
                      title={c.name}
                    >
                      <div className="border rounded-4 overflow-hidden h-100 bg-white shadow-sm">
                        <div className="ratio ratio-4x3 bg-light">
                          <img
                            src={c.image}
                            alt={c.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="p-3 d-flex align-items-center justify-content-between">
                          <h6
                            className="mb-0 text-dark text-truncate"
                            style={{ maxWidth: "75%" }}
                          >
                            {c.name}
                          </h6>
                          <span className="text-success">
                            <i className="fa-solid fa-chevron-right"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
