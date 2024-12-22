import { Outlet } from "react-router-dom";
import DashBoardNav from "./DashBoardNav/DashBoardNav";

const Dashboard = () => {
  return (
    <div className="container px-auto">
      <div className="grid grid-cols-1 md:grid-cols-[20%,80%]">
        <div className="min-h-[calc(100vh-377px)] bg-[#264653]">
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
