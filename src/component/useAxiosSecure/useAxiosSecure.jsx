import axios from "axios";
import { useEffect } from "react";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
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
              console.log("logout user for 401 OR 403");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error caught in Interceptor");
        }
        return Promise.reject(err);
      }
    );
  }, [navigate, logout]);
  return axiosInstance;
};

export default useAxiosSecure;
