import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className={`min-h-[calc(100vh-377px)]`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
