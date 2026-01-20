import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductsPage from "./pages/ProductsPage.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "products/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
        {
          path: "brands",
          element: <BrandsPage />,
        },
        {
          path: "cart",
          element: (
            // <ProtectedRoute>
            <CartPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
