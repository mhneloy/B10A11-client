import Lottie from "lottie-react";
import registerLottie from "../../Lotties/register.json";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const { createUser, googleLogin } = useCustomContex();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!passwordRegex.test(password)) {
      alert(
        "Your password is not valid. It must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }
    createUser(email, password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully logged in with Google!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-left",
        });
      });
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-4xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={registerLottie} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6 rounded-lg">
          <form className="card-body space-y-4" onSubmit={handleRegister}>
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Register Now!
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
                Register
              </button>
            </div>
          </form>
          <div className="divider text-gray-500">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
          >
            <FaGoogle size={20} />
            LogIn with Google
          </button>
          <p className="mt-4 text-center text-sm md:text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
