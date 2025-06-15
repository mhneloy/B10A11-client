import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../shareComponent/ErrorPage/ErrorPage";
import Home from "../component/Home/Home";
import SignIn from "../component/SignIn/SignIn";
import Register from "../component/Register/Register";
import Dashboard from "../component/Dashboard/Dashboard";
import AddMarathon from "../component/AddMarathon/AddMarathon";
import MyMarathonList from "../component/MyMarathonList/MyMarathonList";
import MyApplyList from "../component/MyApplyList/MyApplyList";
import PrivateRoute from "../component/PrivateRote/PrivateRoute";
import AllMarathons from "../component/AllMarathons/AllMarathons";
import DetailsPage from "../component/DetailsPage/DetailsPage";
import RegistrationForm from "../component/RegistrationForm/RegistrationForm";
import Contact from "../component/ContactUs/Contact";

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
        element: <AllMarathons />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/registrationform/:id",
        element: (
          <PrivateRoute>
            <RegistrationForm></RegistrationForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <AddMarathon />,
          },

          {
            path: "myMarathonList",
            element: <MyMarathonList />,
          },
          {
            path: "myApplyList",
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
