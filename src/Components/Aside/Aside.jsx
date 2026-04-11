import { Link, NavLink, useNavigate } from "react-router";
import {
  Home,
  Users,
  Settings,
  ArrowBigLeft,
  LogOut,
  CirclePlus,
  ChartNoAxesGantt,
  UserPen,
} from "lucide-react";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Aside = () => {
  const { role } = useContext(AuthContext);
  const navigate=useNavigate();

const logout = () => {
  Swal.fire({
    title: "Do you want to Logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};


  const closeSidebar = () => {
    const drawer = document.getElementById("dashboard-drawer");
    if (drawer && window.innerWidth < 1024) {
      drawer.checked = false;
    }
  };

  return (
    <aside className="flex flex-col h-full w-72 bg-slate-900 text-white shadow-2xl">
      {/* Logo */}
      {role == "admin" && (
        <div className="h-[72px] flex items-center justify-center text-xl font-extrabold border-b border-slate-700/50 bg-slate-950">
          Admin Panel
        </div>
      )}
      {role == "donor" && (
        <div className="h-[72px] flex items-center justify-center text-xl font-extrabold border-b border-slate-700/50 bg-slate-950">
          Donor Panel
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto w-full">
        <NavLink
          to="/dashboard/main"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
            ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
          }
        >
          <Home size={22} />
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
            ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
          }
        >
          <UserPen size={22} />
          My Profile
        </NavLink>

        <NavLink
          to="add-request"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
            ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
          }
        >
          <CirclePlus size={22} />
          Add Request
        </NavLink>

        {role === "admin" || role === "volunteer" ? (
          <NavLink
            to="/dashboard/my-request"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
              ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
            }
          >
            <ChartNoAxesGantt size={22} />
            All Donation Requests
          </NavLink>
        ) : (
          <NavLink
            to="/dashboard/my-request"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
              ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
            }
          >
            <ChartNoAxesGantt size={22} />
            My Requests
          </NavLink>
        )}

        {role == "admin" && (
          <NavLink
            to="/dashboard/all-users"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
            ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
            }
          >
            <Users size={22} />
            All Users
          </NavLink>
        )}
        
        <div className="pt-4 mt-4 border-t border-slate-700/50">
            <NavLink
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                ${isActive ? "bg-red-600 shadow-lg shadow-red-600/30" : "hover:bg-slate-800 text-gray-300 hover:text-white"}`
            }
            >
            <ArrowBigLeft size={22} />
            Go to Home
            </NavLink>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Link
            onClick={() => { closeSidebar(); logout(); }}
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-800 hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-300 font-bold shadow-md"
        >
            <LogOut size={22} />
            Logout
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
