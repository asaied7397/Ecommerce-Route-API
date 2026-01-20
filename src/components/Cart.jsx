import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { saveCart } from "../utils/cart.js";

export default function CartPage() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  function increase(id) {
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }

  function decrease(id) {
    setItems((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function remove(id) {
    setItems((prev) => prev.filter((i) => i._id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i
          className="fa-solid fa-cart-shopping text-muted mb-3"
          style={{ fontSize: 60 }}
        ></i>
        <h3>Your cart is empty</h3>
        <p className="text-muted">Add some products to get started</p>
        <Link to="/products" className="btn btn-success">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="fa-solid fa-cart-shopping me-2"></i>
        Shopping Cart
      </h2>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {items.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm border-0">
              <div className="row g-0 align-items-center">
                <div className="col-4 col-md-3 p-2">
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{ objectFit: "contain", height: 100 }}
                  />
                </div>

                <div className="col-8 col-md-9">
                  <div className="card-body">
                    <h6 className="card-title text-truncate">{item.title}</h6>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">
                        {item.price} EGP
                      </span>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decrease(item._id)}
                        >
                          −
                        </button>

                        <span className="fw-bold">{item.quantity}</span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increase(item._id)}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => remove(item._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <span className="fw-bold text-success">{totalPrice} EGP</span>
              </div>

              <button className="btn btn-success w-100 mb-2">
                Proceed to Checkout
              </button>

              <Link to="/products" className="btn btn-outline-dark w-100">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
