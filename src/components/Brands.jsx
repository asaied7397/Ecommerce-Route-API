import React, { useEffect, useMemo, useState } from "react";
import { brandsApi } from "../api/brands";
import { Link } from "react-router-dom";

export default function BrandsPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await brandsApi.getAll({ page: 1, limit: 100 });
        const list = data?.data || data?.results || [];
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled)
          setErr(
            e?.response?.data?.message || e?.message || "Failed to load brands",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => (cancelled = true);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((b) => (b.name || "").toLowerCase().includes(term));
  }, [items, q]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="fa-solid fa-tags me-2 text-success"></i>
            Brands
          </h2>
          <p className="text-muted mb-0">
            Browse all brands and explore their products.
          </p>
        </div>

        <div className="d-flex gap-2">
          <input
            className="form-control"
            style={{ minWidth: 240 }}
            placeholder="Search brand..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQ("")}
            disabled={!q}
            title="Clear"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      {loading && (
        <div className="row g-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="col-6 col-md-4 col-lg-3">
              <div
                className="border rounded-4 bg-light"
                style={{ height: 150 }}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && filtered.length === 0 && (
        <div className="alert alert-warning">No brands found.</div>
      )}

      {!loading && !err && filtered.length > 0 && (
        <>
          <div className="small text-muted mb-2">
            Showing <strong>{filtered.length}</strong> brand(s)
          </div>

          <div className="row g-3">
            {filtered.map((b) => (
              <div key={b._id || b.id} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="p-3 d-flex align-items-center justify-content-center bg-white">
                    <img
                      src={b.image}
                      alt={b.name}
                      style={{
                        maxHeight: 60,
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div className="card-body pt-0">
                    <h6 className="mb-0 text-center text-truncate">{b.name}</h6>
                  </div>

                  <div className="card-footer bg-white border-0">
                    <Link
                      to={`/products?brand=${encodeURIComponent(b._id)}`}
                      className="btn btn-outline-success btn-sm w-100"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
