import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../../api/products";

function getRemainingTime(end) {
  const diff = Math.max(0, end - Date.now());
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { h, m, s };
}

export default function FlashDeals({
  title = "Flash Deals",
  subtitle = "Limited-time offers you don’t want to miss",
  limit = 8,
  hours = 6,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const endTime = useMemo(() => Date.now() + hours * 60 * 60 * 1000, [hours]);
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(endTime));

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getRemainingTime(endTime));
    }, 1000);
    return () => clearInterval(t);
  }, [endTime]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await productsApi.getAll({
          page: 1,
          limit,
          sort: "-ratingsAverage",
        });
        const list = data?.data || [];
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled)
          setErr(
            e?.response?.data?.message || e?.message || "Failed to load deals",
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
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
          <div>
            <h4 className="fw-bold mb-1">
              <i className="fa-solid fa-bolt text-warning me-2"></i>
              {title}
            </h4>
            <p className="text-muted mb-0">{subtitle}</p>
          </div>

          <div className="d-flex gap-2">
            <span className="badge bg-dark fs-6">{timeLeft.h}h</span>
            <span className="badge bg-dark fs-6">{timeLeft.m}m</span>
            <span className="badge bg-dark fs-6">{timeLeft.s}s</span>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-3 p-md-4">
            {loading && (
              <div className="row g-3">
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className="col-6 col-md-3">
                    <div
                      className="border rounded-3 bg-light"
                      style={{ height: 220 }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!loading && err && (
              <div className="alert alert-danger mb-0">{err}</div>
            )}

            {!loading && !err && (
              <>
                <div className="row g-3">
                  {items.map((p) => (
                    <div key={p._id} className="col-6 col-md-3">
                      <div className="card h-100 border-0 shadow-sm">
                        <img
                          src={p.imageCover}
                          alt={p.title}
                          className="card-img-top"
                          style={{ height: 150, objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="card-title text-truncate">
                            {p.title}
                          </h6>

                          <div className="d-flex align-items-center justify-content-between">
                            <span className="fw-bold text-success">
                              {p.price} EGP
                            </span>
                            <span className="small text-muted">
                              <i className="fa-solid fa-star text-warning me-1"></i>
                              {p.ratingsAverage}
                            </span>
                          </div>
                        </div>
                        <div className="card-footer bg-white border-0">
                          <Link
                            to={`/products/${p._id}`}
                            className="btn btn-outline-success btn-sm w-100"
                          >
                            View deal
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <Link to="/products" className="btn btn-success">
                    View all deals
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
