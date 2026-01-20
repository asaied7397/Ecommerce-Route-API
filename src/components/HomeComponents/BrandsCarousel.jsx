import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { brandsApi } from "../../api/brands";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function BrandsCarousel({
  title = "Top Brands",
  subtitle = "Shop by your favorite brand",
  limit = 18,
  perSlide = 6,
  intervalMs = 3500,
  showDots = true,
}) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await brandsApi.getAll({ page: 1, limit });
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
  }, [limit]);

  const slides = useMemo(() => chunk(items, perSlide), [items, perSlide]);

  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [slides.length, active]);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  function prev() {
    if (!slides.length) return;
    setActive((a) => (a - 1 + slides.length) % slides.length);
  }

  function next() {
    if (!slides.length) return;
    setActive((a) => (a + 1) % slides.length);
  }

  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-3">
          <div>
            <h4 className="fw-bold mb-1">{title}</h4>
            <p className="text-muted mb-0">{subtitle}</p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={prev}
              disabled={!slides.length}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={next}
              disabled={!slides.length}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <Link to="/brands" className="btn btn-success btn-sm">
              View all <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-3 p-md-4">
            {loading && (
              <div className="row g-3">
                {Array.from({ length: perSlide }).map((_, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-2">
                    <div
                      className="border rounded-3 p-3 bg-light"
                      style={{ height: 72 }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!loading && err && (
              <div className="alert alert-danger mb-0">{err}</div>
            )}

            {!loading && !err && slides.length === 0 && (
              <div className="alert alert-warning mb-0">No brands to show.</div>
            )}

            {!loading && !err && slides.length > 0 && (
              <>
                <div className="row g-3 align-items-center">
                  {slides[active].map((b) => (
                    <div
                      key={b._id || b.id}
                      className="col-6 col-md-4 col-lg-2"
                    >
                      <Link
                        to={`/brands/${b._id}`}
                        className="text-decoration-none"
                        aria-label={b.name}
                        title={b.name}
                      >
                        <div className="border rounded-3 p-3 h-100 bg-white d-flex align-items-center justify-content-center">
                          <img
                            src={b.image}
                            alt={b.name}
                            style={{
                              maxHeight: 44,
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </Link>
                      <div className="small text-center text-muted mt-2 text-truncate">
                        {b.name}
                      </div>
                    </div>
                  ))}
                </div>

                {showDots && slides.length > 1 && (
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className="btn p-0 border-0"
                        aria-label={`Brand slide ${i + 1}`}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          background:
                            i === active
                              ? "var(--bs-success)"
                              : "var(--bs-gray-400)",
                          opacity: i === active ? 1 : 0.6,
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
