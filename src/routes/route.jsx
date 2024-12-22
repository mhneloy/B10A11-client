import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../shareComponent/ErrorPage/ErrorPage";
import Home from "../component/Home/Home";
import SignIn from "../component/SignIn/SignIn";
import Register from "../component/Register/Register";
import Marathons from "../component/Marathons/Marathons";
import Dashboard from "../component/Dashboard/Dashboard";
import AddMarathon from "../component/AddMarathon/AddMarathon";
import MyMarathonList from "../component/MyMarathonList/MyMarathonList";
import MyApplyList from "../component/MyApplyList/MyApplyList";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/marathons",
        element: <Marathons />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard",
            element: <AddMarathon />,
          },

          {
            path: "dashboard/myMarathonList",
            element: <MyMarathonList />,
          },
          {
            path: "dashboard/myApplyList",
            element: <MyApplyList />,
          },
        ],
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
