import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import ManageProduct from "../Pages/ManageProduct/ManageProduct";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSucccess/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Error from "../Pages/Error/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <Error/>,
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
          path:"/donate",
          element: <PrivateRoute><Donate/></PrivateRoute>
        },
        {
          path:"/payment-success",
          element: <PaymentSuccess/>
        },
        {
          path:"/payment-cancelled",
          element: <PaymentCancel/>
        },
        {
          path:"/search",
          element: <PrivateRoute><SearchRequest/></PrivateRoute>
        },
        {
          path: '/login',
          element: <Login/>
        }
    ]
  },
  {
    path: 'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'/dashboard/main',
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