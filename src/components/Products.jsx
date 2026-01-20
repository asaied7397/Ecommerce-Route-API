import { useEffect, useState } from "react";
import { productsApi } from "../api/products.js";
import { useSearchParams, Link } from "react-router-dom";
import { brandsApi } from "../api/brands.js";
import { categoriesApi } from "../api/categories.js";
import { addToCart } from "../utils/cart.js";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const params = {
          page: 1,
          limit: 50,
          ...(keyword ? { keyword } : {}),
        };

        const data = brand
          ? await productsApi.getByBrandId(brand, params)
          : category
            ? await productsApi.getByCategoryId(category, params)
            : await productsApi.getAll(params);

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
  }, [brand, category, keyword]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!brand) {
        setBrandName("");
        return;
      }

      try {
        const res = await brandsApi.getById(brand);
        const name = res?.data?.name || "";
        if (!cancelled) setBrandName(name);
      } catch {
        if (!cancelled) setBrandName("");
      }
    })();

    return () => (cancelled = true);
  }, [brand]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!category) {
        setCategoryName("");
        return;
      }

      try {
        const res = await categoriesApi.getById(category);
        const name = res?.data?.name || "";
        if (!cancelled) setCategoryName(name);
      } catch {
        if (!cancelled) setCategoryName("");
      }
    })();

    return () => (cancelled = true);
  }, [category]);

  return (
    <div className="container py-4">
      <h3 className="mb-3">
        <i className="fa-solid fa-box me-2"></i>
        Products
      </h3>

      {brand ? (
        <div className="alert alert-success d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <div>
            <i className="fa-solid fa-filter me-2"></i>
            Displaying products for <strong>
              {brandName || "this brand"}
            </strong>{" "}
            only
          </div>

          <Link to="/products" className="btn btn-sm btn-outline-dark">
            Clear filter
          </Link>
        </div>
      ) : category ? (
        <div className="alert alert-success d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <div>
            <i className="fa-solid fa-filter me-2"></i>
            Displaying products for{" "}
            <strong>{categoryName || "this category"}</strong> only
          </div>

          <Link to="/products" className="btn btn-sm btn-outline-dark">
            Clear filter
          </Link>
        </div>
      ) : null}

      {loading && <div className="alert alert-info">Loading...</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="row g-3">
        {items.map((p) => (
          <div
            key={p._id || p.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card h-100 shadow-sm">
              <img
                src={p.imageCover}
                className="card-img-top"
                alt={p.title}
                style={{ objectFit: "contain", height: 180 }}
              />
              <div className="card-body">
                <h6 className="card-title mb-1">
                  {p.category?.name || p.category}
                </h6>
                <h4 className="card-title text-truncate mb-1">{p.title}</h4>
                <div className="text-success fw-bold">{p.price} EGP</div>
                <div className="small text-muted">
                  <i className="fa-solid fa-star me-1 text-warning"></i>
                  {p.ratingsAverage ?? "-"}
                </div>
              </div>
              <div className="card-footer bg-white border-0">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => {
                    addToCart(p, 1);
                    alert("Added to cart ✅");
                  }}
                >
                  <i className="fa-solid fa-cart-plus me-2"></i>
                  Add to cart
                </button>
              </div>
              <div className="card-footer bg-white border-0">
                <Link
                  to={`/products/${encodeURIComponent(p._id || p.id)}`}
                  className="btn btn-outline-primary w-100"
                >
                  Show Product Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && !err && items.length === 0 && (
        <div className="alert alert-warning mt-3">No products</div>
      )}
    </div>
  );
}
