import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import AuthLayouts from "../Pages/AuthLayouts/AuthLayouts";
import AddPlantForm from "../Pages/Dashboard/Librarian/AddPlantForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/addPlantForms",
        Component: AddPlantForm,
      },
    ],
  },
]);
