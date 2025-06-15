import Lottie from "lottie-react";
import signin from "../../Lotties/signin.json";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
// import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, googleLogin } = useCustomContex();

  const successNofity = () => {
    toast.success("Successfully Login!", {
      position: "top-center",
    });
  };

  const errorNofity = (error = "password or email is not valid") => {
    toast.error(error, {
      position: "top-left",
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        if (result.user) {
          console.log(result);
          successNofity();
          e.target.reset();
          if (location.state) {
            navigate(location.state);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => errorNofity(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
        successNofity();
      })
      .catch((error) => {
        errorNofity(error.message);
      });
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Marathon-GuidLine | SignIn</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-4xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={signin} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6 rounded-lg">
          <form className="card-body space-y-4" onSubmit={handleSignIn}>
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Sign-In
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>
          <div className="divider text-gray-500">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
          >
            <FaGoogle size={20} />
            Login with Google
          </button>
          <p className="mt-4 text-center text-sm md:text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
