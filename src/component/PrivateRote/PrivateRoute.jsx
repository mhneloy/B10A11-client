import PropTypes from "prop-types";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useCustomContex();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (user && user?.email) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/signIn"} state={location?.pathname}></Navigate>;
  }
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.element,
};
