import axios from "axios";
import { useEffect } from "react";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://server-site-ashen.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logout } = useCustomContex();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          logout()
            .then(() => {
              navigate("/signIn");
              console.log(err);
            })
            .catch((err) => console.log(err));
        }
      }
    );
  }, [navigate, logout]);
  return axiosInstance;
};

export default useAxiosSecure;
