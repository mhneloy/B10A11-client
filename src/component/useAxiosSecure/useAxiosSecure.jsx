import axios from "axios";
import { useEffect } from "react";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://server-site-md-mahmudul-hassans-projects.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logout } = useCustomContex();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const status = err?.response?.status;

        // Check user is logged in
        if ((status === 401 || status === 403) && user?.email) {
          console.warn("Auth error for user:", user.email);

          try {
            await logout();
            navigate("/signIn");
          } catch (logoutErr) {
            console.error("Logout failed:", logoutErr);
          }
        }

        return Promise.reject(err); // Always rethrow the error
      }
    );

    // Important: Cleanup interceptor when component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate, logout, user?.email]); // make sure it updates when user changes

  return axiosInstance;
};

export default useAxiosSecure;
