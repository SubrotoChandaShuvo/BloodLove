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
import AllRequest from "../Pages/AllRequest/AllRequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Details from "../Pages/Details/Details";
import EditRequest from "../Pages/Dashboard/Edit/EditRequest";
import Settings from "../Pages/Dashboard/Settings/Settings";
import DonationJourney from "../Pages/Dashboard/DonationJourney/DonationJourney";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancel />,
      },
      {
        path: "/all-request",
        element: <AllRequest />,
      },
      {
        path: "/add-request",
        element: <PrivateRoute><AddRequest /></PrivateRoute>
      },
      {
        path: "/search",
        element: (
            <SearchRequest />
        ),
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
  {
    path: "dashboard",
    element: (
        <DashboardLayout></DashboardLayout>
    ),
    children: [
      {
        path: "main",
        element: <PrivateRoute><MainDashboard /></PrivateRoute>
      },
      {
        path: "all-users",
        element: <PrivateRoute><AllUsers /></PrivateRoute>,
      },
      {
        path: "my-request",
        element: <PrivateRoute><MyRequest />,</PrivateRoute>
      },
      {
        path: "edit-request/:id",
        element: <PrivateRoute><EditRequest/></PrivateRoute>
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        )
      },
      {
        path: "donation-journey",
        element: (
          <PrivateRoute>
            <DonationJourney />
          </PrivateRoute>
        )
      },
    ],
  },
]);

export default router;
