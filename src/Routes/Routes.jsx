import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DasboardLayout from "../DashboardLayout/DasboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import ManageProduct from "../Pages/ManageProduct/ManageProduct";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
        {
            path:'/',
            Component: Home
        },
        {
          path:"/register",
          element: <Register/>
        },
        {
          path: '/login',
          element: <Login/>
        }
    ]
  },
  {
    path: 'dashboard',
    element:<PrivateRoute><DasboardLayout></DasboardLayout></PrivateRoute>,
    children:[
      {
        path:'/dashboard',
        element:<MainDashboard/>
      },
      {
        path:'add-request',
        element:<AddRequest/>
      },
      {
        path:'all-users',
        element:<AllUsers/>
      },
      {
        path:'my-request',
        element:<MyRequest/>
      }
    ]
  }
]);

export default router;