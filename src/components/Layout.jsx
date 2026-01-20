import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
