import { Link, NavLink } from "react-router";
import {
  Home,
  Users,
  Settings,
  ArrowBigLeft,
  LogOut,
  CirclePlus,
  ChartNoAxesGantt,
  UserPen
} from "lucide-react";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

// const Aside= () => {

//   const {role}=useContext(AuthContext);

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
//     { name: "Add Request", path: "add-request", icon: <CirclePlus size={20} /> },
//     { name: "Manage Products", path: "/dashboard/manage-product", icon: <ChartNoAxesGantt size={20} /> },
//     { name: "All Users", path: "/dashboard/all-users", icon: <Users size={20} /> },
//     { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
//     { name: "Main", path: "/", icon: <ArrowBigLeft size={20} /> }
//   ];

//     const logout = () => {
//     signOut(auth);
//   };

//   return (
//     <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

//       {/* Logo */}
//       <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
//         Admin Panel
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition
//               ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
//             }
//           >
//             {item.icon}
//             <span>{item.name}</span>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Logout */}
//       <Link onClick={logout} className="m-4 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition">
//         <LogOut size={20} />
//         Logout
//       </Link>
//     </aside>
//   );
// };

// export default Aside;

const Aside = () => {
  const { role } = useContext(AuthContext);

  const logout = () => {
    signOut(auth);
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      {role == "admin" && (
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Admin Panel
        </div>
      )}
      {role == "donor" && (
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Info Panel
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <NavLink
          to="/dashboard/main"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <UserPen size={20} />
          My Profile
        </NavLink>

        {role == "donor" && (
          <NavLink
            to="add-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
            }
          >
            <CirclePlus size={20} />
            Add Request
          </NavLink>
        )}

        <NavLink
          to="/dashboard/my-request"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <ChartNoAxesGantt size={20} />
          My Request
        </NavLink>

        {role == "admin" && (
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
            }
          >
            <Users size={20} />
            All Users
          </NavLink>
        )}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive ? "bg-red-600" : "hover:bg-slate-800"}`
          }
        >
          <ArrowBigLeft size={20} />
          Go Home
        </NavLink>
      </nav>

      {/* Logout */}
      <Link
        onClick={logout}
        className="m-4 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </Link>
    </aside>
  );
};

export default Aside;
