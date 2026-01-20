import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      rePassword: form.rePassword,
      phone: form.phone.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.password ||
      !payload.rePassword ||
      !payload.phone
    ) {
      setErr("Please fill all fields.");
      return;
    }

    if (payload.password !== payload.rePassword) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      await authApi.signup(payload);

      navigate("/login", { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i
                  className="fa-solid fa-user-plus text-success mb-2"
                  style={{ fontSize: 42 }}
                ></i>
                <h3 className="fw-bold mb-1">Create Account</h3>
                <p className="text-muted mb-0">Sign up to start shopping</p>
              </div>

              {err && <div className="alert alert-danger">{err}</div>}

              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Your name"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="col-12">
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
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
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
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="rePassword"
                        value={form.rePassword}
                        onChange={onChange}
                        placeholder="••••••••"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="01xxxxxxxxx"
                        disabled={loading}
                      />
                    </div>
                    <small className="text-muted">
                      Use Egyptian format like 010xxxxxxxx
                    </small>
                  </div>
                </div>

                <button
                  className="btn btn-success w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>

                <div className="text-center mt-3">
                  <span className="text-muted">Already have an account? </span>
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <small className="text-muted d-block text-center mt-3">
            By signing up, you agree to our Terms & Privacy Policy.
          </small>
        </div>
      </div>
    </div>
  );
}
