import { NavLink } from "react-router-dom";

const DashBoardNav = () => {
  return (
    <nav className="bg-transparent text-white">
      <div className="py-4">
        {/* Navbar Menu */}
        <ul className="flex flex-col items-start space-y-4 justify-center">
          <li className="w-full flex justify-center items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => {
                return `text-lg font-semibold ${
                  isActive
                    ? "text-[#2A9D8F]"
                    : "!text-white hover:text-[#2A9D8F]"
                }`;
              }}
            >
              Add Marathon
            </NavLink>
          </li>
          <li className="w-full flex justify-center items-center">
            <NavLink
              to="dashboard/myMarathonList"
              className={({ isActive }) => {
                return `text-lg font-semibold ${
                  isActive
                    ? "text-[#2A9D8F]"
                    : "text-white hover:text-[#2A9D8F]"
                }`;
              }}
            >
              My Marathon List
            </NavLink>
          </li>
          <li className="w-full flex justify-center items-center">
            <NavLink
              to="dashboard/myApplyList"
              className={({ isActive }) => {
                return `text-lg font-semibold ${
                  isActive
                    ? "text-[#2A9D8F]"
                    : "text-white hover:text-[#2A9D8F]"
                }`;
              }}
            >
              My Apply List
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashBoardNav;
