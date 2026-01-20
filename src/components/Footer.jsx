import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/logo.avif"
                alt="Logo"
                width="36"
                height="36"
                style={{ objectFit: "contain" }}
              />
              <h5 className="mb-0 fw-bold">E-Commerce App</h5>
            </div>
            <p className="text-white-50 mb-3">
              A modern shopping experience built with React, Bootstrap, and
              Route API. Browse products, manage your cart, and checkout
              smoothly.
            </p>

            <div className="d-flex gap-2">
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="X"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled d-grid gap-2 mt-3">
              <li>
                <Link className="text-decoration-none text-white-50" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-white-50"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-white-50"
                  to="/categories"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-white-50"
                  to="/brands"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-semibold">Support</h6>
            <ul className="list-unstyled d-grid gap-2 mt-3">
              <li>
                <a className="text-decoration-none text-white-50" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-white-50" href="#">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-white-50" href="#">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-white-50" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-semibold">Contact</h6>

            <div className="mt-3 d-grid gap-2 text-white-50">
              <div className="d-flex gap-2 align-items-start">
                <i className="fa-solid fa-location-dot mt-1"></i>
                <span>Cairo, Egypt</span>
              </div>

              <div className="d-flex gap-2 align-items-start">
                <i className="fa-solid fa-envelope mt-1"></i>
                <a
                  className="text-decoration-none text-white-50"
                  href="mailto:support@shop.com"
                >
                  support@shop.com
                </a>
              </div>

              <div className="d-flex gap-2 align-items-start">
                <i className="fa-solid fa-phone mt-1"></i>
                <a
                  className="text-decoration-none text-white-50"
                  href="tel:+201000000000"
                >
                  +20 100 000 0000
                </a>
              </div>
            </div>

            <div className="mt-3">
              <small className="text-white-50 d-block mb-2">
                Subscribe for offers
              </small>
              <form
                className="d-flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email address"
                />
                <button className="btn btn-success btn-sm" type="submit">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row gap-2 align-items-center justify-content-between">
          <small className="text-white-50">
            © {year} E-Commerce App. All rights reserved.
          </small>

          <div className="d-flex align-items-center gap-3 text-white-50">
            <span className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-lock"></i>
              Secure payments
            </span>
            <span className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-truck-fast"></i>
              Fast delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
