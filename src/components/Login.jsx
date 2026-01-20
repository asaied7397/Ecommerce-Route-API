import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      const data = await authApi.signin({ email, password });

      const token = data?.token;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.user?.name) {
        localStorage.setItem("userName", data.user.name);
      }

      if (!token) throw new Error("Token not found in response.");

      window.dispatchEvent(new Event("auth:changed"));

      navigate(from, { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i
                  className="fa-solid fa-user-lock text-success mb-2"
                  style={{ fontSize: 42 }}
                ></i>
                <h3 className="fw-bold mb-1">Welcome back</h3>
                <p className="text-muted mb-0">Log in to continue shopping</p>
              </div>

              {err && <div className="alert alert-danger">{err}</div>}

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="name@example.com"
                      autoComplete="email"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    disabled
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>

                <div className="text-center mt-3">
                  <span className="text-muted">Don’t have an account? </span>
                  <Link
                    to="/register"
                    className="text-decoration-none fw-semibold"
                  >
                    Create one
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <small className="text-muted d-block text-center mt-3">
            By logging in, you agree to our Terms & Privacy Policy.
          </small>
        </div>
      </div>
    </div>
  );
}
