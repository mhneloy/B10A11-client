import { Link } from "react-router-dom";

const DashBoardNav = () => {
  return (
    <nav className="bg-transparent text-white">
      <div className="py-4">
        {/* Navbar Menu */}
        <ul className="flex flex-col items-start space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="text-lg font-semibold hover:text-[#2A9D8F]"
            >
              Add Marathon
            </Link>
          </li>
          <li>
            <Link
              to="dashboard/myMarathonList"
              className="text-lg font-semibold hover:text-[#2A9D8F]"
            >
              My Marathon List
            </Link>
          </li>
          <li>
            <Link
              to="dashboard/myApplyList"
              className="text-lg font-semibold hover:text-[#2A9D8F]"
            >
              My Apply List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashBoardNav;
