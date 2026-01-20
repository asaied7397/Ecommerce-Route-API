import { useState, useEffect } from "react";
import logo from "../../public/logo.avif";
import { getCartCount } from "../utils/cart.js";

import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [searchText, setSearchText] = useState("");
  const userName = localStorage.getItem("userName");

  function handleSearch(e) {
    e.preventDefault();
    const q = searchText.trim();
    if (!q) return;
    console.log("search q:", q);

    navigate(`/products?keyword=${encodeURIComponent(q)}`);
    setSearchText("");
    setOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "fw-bold text-success" : ""}`;

  function closeMenu() {
    setOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:changed"));
    setIsAuth(false);
    navigate("/login");
  }

  useEffect(() => {
    const sync = () => setCartCount(getCartCount());

    sync();

    window.addEventListener("cart:changed", sync);

    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const syncAuth = () => setIsAuth(!!localStorage.getItem("token"));
    syncAuth();
    window.addEventListener("auth:changed", syncAuth);
    return () => window.removeEventListener("auth:changed", syncAuth);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-success mb-3 shadow-sm">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            style={{ objectFit: "contain" }}
          />
          <span className="fw-bold">E-Commerce</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="mainNav"
          className={`navbar-collapse ${open ? "show" : "collapse"}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass} end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/categories"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/brands"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Brands
              </NavLink>
            </li>
          </ul>

          <form
            className="d-flex gap-2 my-2 my-lg-0"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex align-items-center gap-3 ms-lg-3">
            <Link
              className="nav-link position-relative"
              to="/cart"
              onClick={closeMenu}
              aria-label="Cart"
            >
              <i className="fa-solid fa-cart-shopping text-success fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isAuth ? (
              <NavLink
                to="/login"
                className="btn btn-outline-dark btn-sm"
                onClick={closeMenu}
              >
                Log in
              </NavLink>
            ) : (
              <>
                <span className="badge bg-success bg-opacity-10 text-success me-2">
                  Welcome {userName ? `, ${userName}` : "User"}
                </span>

                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
