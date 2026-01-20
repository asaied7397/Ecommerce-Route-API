import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../../api/products";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function HeroProductsCarousel({
  title = "Featured Products",
  subtitle = "Top picks for you today",
  limit = 12,
  perSlide = 4,
  intervalMs = 4500,
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
        const data = await productsApi.getAll({ page: 1, limit });
        const list = data?.data || data?.results || [];
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled)
          setErr(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load products",
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
            <h2 className="fw-bold mb-1">{title}</h2>
            <p className="text-muted mb-0">{subtitle}</p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={prev}
              disabled={!slides.length}
            >
              <i className="fa-solid fa-chevron-left me-1"></i> Prev
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={next}
              disabled={!slides.length}
            >
              Next <i className="fa-solid fa-chevron-right ms-1"></i>
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="p-4 p-md-5 bg-success bg-opacity-10 border-bottom">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <div className="badge text-bg-success mb-2">
                  <i className="fa-solid fa-bolt me-1"></i> Hot deals
                </div>
                <h3 className="fw-bold mb-1">
                  Discover your next favorite item
                </h3>
                <p className="text-muted mb-0">
                  Swipe through featured products and shop instantly.
                </p>
              </div>

              <Link to="/products" className="btn btn-success">
                Browse all our Products
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>

          <div className="p-3 p-md-4">
            {loading && (
              <div className="row g-3">
                {Array.from({ length: perSlide }).map((_, i) => (
                  <div key={i} className="col-12 col-sm-6 col-lg-3">
                    <div className="card h-100">
                      <div className="ratio ratio-4x3 bg-light"></div>
                      <div className="card-body">
                        <div className="placeholder-glow">
                          <span className="placeholder col-8"></span>
                          <span className="placeholder col-6"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && err && (
              <div className="alert alert-danger mb-0">{err}</div>
            )}

            {!loading && !err && slides.length === 0 && (
              <div className="alert alert-warning mb-0">
                No products to show.
              </div>
            )}

            {!loading && !err && slides.length > 0 && (
              <>
                <div className="row g-3">
                  {slides[active].map((p) => (
                    <div
                      key={p._id || p.id}
                      className="col-12 col-sm-6 col-lg-3"
                    >
                      <div className="card h-100 border-0 shadow-sm">
                        <img
                          src={p.imageCover}
                          alt={p.title}
                          className="card-img-top"
                          style={{ height: 170, objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <div className="small text-muted mb-1">
                            <i className="fa-solid fa-star text-warning me-1"></i>
                            {p.ratingsAverage ?? "-"}
                          </div>
                          <h6 className="card-title mb-2 text-truncate">
                            {p.title}
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="fw-bold text-success">
                              {p.price} EGP
                            </span>
                            <Link
                              to={`/products/${p._id}`}
                              className="btn btn-outline-success btn-sm"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-center gap-2 mt-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`btn p-0 border-0`}
                      aria-label={`Slide ${i + 1}`}
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

                <div className="text-center mt-2">
                  <small className="text-muted">
                    Slide {active + 1} of {slides.length}
                  </small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
