import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="card border-0 shadow-sm">
            <div className="card-body py-5">
              <i
                className="fa-solid fa-triangle-exclamation text-warning mb-3"
                style={{ fontSize: 64 }}
              ></i>

              <h1 className="fw-bold mb-2">404</h1>
              <h4 className="mb-3">Page Not Found</h4>

              <p className="text-muted mb-4">
                Sorry, the page you are looking for doesn’t exist or has been
                moved.
              </p>

              <div className="d-flex justify-content-center gap-2">
                <Link to="/" className="btn btn-success">
                  <i className="fa-solid fa-house me-2"></i>
                  Go Home
                </Link>

                <Link to="/products" className="btn btn-outline-dark">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>

          <small className="text-muted d-block mt-3">
            If you think this is a mistake, please contact support.
          </small>
        </div>
      </div>
    </div>
  );
}
