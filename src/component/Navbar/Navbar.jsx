import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";

const Navbar = () => {
  const { user, logout, togol, setTogol } = useCustomContex();
  const currentLocation = useLocation();
  const link = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "!text-black !bg-[#00FFFF] font-bold hover:bg-[#00FFFF] "
              : "font-bold  hover:bg-[#00FFFF] hover:text-black   lg:text-white"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "!text-black !bg-[#00FFFF] font-bold hover:bg-[#00FFFF] "
              : " font-bold  hover:bg-[#00FFFF] hover:text-black lg:text-white"
          }
          to="/marathons"
        >
          Marathons
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "!text-black !bg-[#00FFFF] font-bold hover:bg-[#00FFFF] "
              : " font-bold  hover:bg-[#00FFFF] hover:text-black lg:text-white"
          }
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "!text-black !bg-[#00FFFF] font-bold hover:bg-[#00FFFF]"
                : "font-bold hover:bg-[#00FFFF] hover:text-black lg:text-white"
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  // handle change

  const handleChange = (e) => {
    const ischeked = e.target.checked;
    localStorage.setItem("marathonTheme", ischeked);
    let isTrue = localStorage.getItem("marathonTheme") === "true";
    setTogol(isTrue);
  };

  return (
    <div className="">
      <div
        className={`navbar flex flex-row justify-between items-center md:items-center bg-[#264653] sm:flex-row md:justify-normal z-40 px-4 lg:px-[100px] h-[80px] md:h-fit `}
      >
        <div className="navbar-start justify-between md:justify-normal ">
          <div className="dropdown z-20">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost lg:hidden ${
                currentLocation.pathname === "/" ? "text-white" : "text-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <div>
            <Link
              to="/"
              className={`text-2xl md:text-4xl font-bold text-white`}
            >
              <Typewriter
                words={["Marathon-GuidLine"]}
                loop={"infinitely"}
              ></Typewriter>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{link}</ul>
        </div>
        <div className="navbar-end  gap-2 md:gap-4">
          {user ? (
            <div className="relative group">
              {/* User Profile Photo */}
              <div
                className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer "
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user.displayName || "User"}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" />
                ) : (
                  <FaUserAlt className="text-black w-full h-full" />
                )}
              </div>

              {/* Tooltip */}
              <div className="z-50 bg-blue-400 absolute top-[125%] left-1/2 -translate-x-1/2 w-max rounded-md hidden group-hover:block">
                <div className="absolute w-4 h-4 rotate-45 bg-blue-400 -top-2 left-1/2 -translate-x-1/2"></div>
                <div className="absolute w-max text-sm p-2 text-center -left-[60px] rounded-sm bg-blue-400">
                  <p>{user.displayName || "Anonymous User"}</p>
                  <button
                    onClick={logout}
                    className="btn btn-sm mt-2 bg-red-500 text-white"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Conditional Links for Non-Logged-In Users
            <div className="flex gap-1 flex-col md:flex-row">
              <Link to="/signIn" className="btn btn-sm bg-blue-500 text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-green-500 text-white"
              >
                Register
              </Link>
            </div>
          )}
          <div className="hidden md:visible">
            <label className="swap swap-rotate w-fit">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" checked={togol} onChange={handleChange} />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                style={{ color: togol ? "white" : "yellow" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                style={{ color: togol ? "white" : "yellow" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
