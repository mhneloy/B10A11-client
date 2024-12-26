import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { ToastContainer } from "react-toastify";
import useCustomContex from "../shareComponent/AuthContext/useCustomContex";

const Layout = () => {
  const { togol } = useCustomContex();
  console.log(togol);
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <div
          style={{
            backgroundColor: togol ? "#273443" : "#264653",
          }}
          // className={`bg-[#264653]`}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
