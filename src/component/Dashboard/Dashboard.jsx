import { Outlet } from "react-router-dom";
import DashBoardNav from "./DashBoardNav/DashBoardNav";

const Dashboard = () => {
  return (
    <div className="lg:px-20 w-full">
      <div className="grid grid-cols-1 md:grid-cols-[20%,80%] w-full">
        <div className=" bg-[#1E293B]">
          <DashBoardNav />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
