import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DasboardLayout from "../DashboardLayout/DasboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import ManageProduct from "../Pages/ManageProduct/ManageProduct";


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
    path: '/dashboard',
    element:<DasboardLayout></DasboardLayout>,
    children:[
      {
        path:'main',
        element:<MainDashboard/>
      },
      {
        path:'add-product',
        element:<AddProduct/>
      },
      {
        path:'manage-product',
        element:<ManageProduct/>
      }
    ]
  }
]);

export default router;