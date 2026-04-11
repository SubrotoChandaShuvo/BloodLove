import { Outlet } from "react-router";
import Aside from "../Components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-slate-50 font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col relative z-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-slate-900 text-white px-5 py-4 w-full shadow-md sticky top-0 z-40">
           <h2 className="text-xl font-extrabold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">BloodLove Portal</h2>
           <label htmlFor="dashboard-drawer" className="p-2 cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
           </label>
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 transition-all">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side z-50 shadow-2xl">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay backdrop-blur-sm"></label>
        {/* Sidebar Component */}
        <Aside />
      </div>
    </div>
  );
};

export default DashboardLayout;
