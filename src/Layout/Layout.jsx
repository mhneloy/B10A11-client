import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className={`min-h-[calc(100vh-350px)] bg-[#264653]`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
