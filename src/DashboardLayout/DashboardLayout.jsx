
import { Outlet } from "react-router";
import Aside from "../Components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Aside />

      <main className="ml-64 p-5 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
