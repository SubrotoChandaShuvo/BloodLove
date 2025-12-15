import React from "react";
import { Outlet } from "react-router";
import Aside from "../Components/Aside/Aside";

const DasboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DasboardLayout;
