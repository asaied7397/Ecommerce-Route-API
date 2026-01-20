import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../api/products";
import { addToCart } from "../utils/cart";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const data = await productsApi.getById(id);
        const p = data?.data || data;

        if (!cancelled) setProduct(p);
      } catch (e) {
        if (!cancelled)
          setErr(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load product",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">Loading product...</div>
      </div>
    );
  }

  if (err || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{err || "Product not found"}</div>
        <Link to="/products" className="btn btn-outline-dark">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <div className="border rounded-4 p-3 bg-white shadow-sm">
            <img
              src={product.imageCover}
              alt={product.title}
              className="img-fluid rounded-3 mb-3"
              style={{ objectFit: "contain", width: "100%" }}
            />

            {product.images?.length > 0 && (
              <div className="d-flex gap-2 overflow-auto">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    className="rounded border"
                    onClick={() =>
                      setProduct((p) => ({ ...p, imageCover: img }))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-7">
          <h2 className="fw-bold mb-2">{product.title}</h2>

          <div className="d-flex align-items-center gap-3 mb-2">
            <span className="badge bg-success fs-6">{product.price} EGP</span>

            <span className="text-muted">
              <i className="fa-solid fa-star text-warning me-1"></i>
              {product.ratingsAverage ?? "-"} / 5
            </span>
          </div>

          <p className="text-muted mb-3">{product.description}</p>

          <div className="mb-3">
            <div className="small text-muted">
              <strong>Category:</strong> {product.category?.name || "-"}
            </div>
            <div className="small text-muted">
              <strong>Brand:</strong> {product.brand?.name || "-"}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => {
                alert("Added to cart ✅");
                addToCart(product, 1);
              }}
            >
              <i className="fa-solid fa-cart-plus me-2"></i>
              Add to cart
            </button>

            <Link to="/products" className="btn btn-outline-dark">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
