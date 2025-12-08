import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import AuthLayouts from "../Pages/AuthLayouts/AuthLayouts";
// import AddBooksForm from "../Pages/Dashboard/Librarian/AddPlantForm";
import AddBooksForm from "../Pages/Dashboard/Librarian/AddBooksForm";
import PrivateRouter from "./PrivateRouter";
import DashboardLayouts from "../Pages/DashboardLayouts/DashboardLayouts";
import Books from "../Components/Books/Books";
import BookDetails from "../Home/BookDetails/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/books/:id",
        element: <BookDetails></BookDetails>,
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
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRouter>
    ),
    children: [
      {
        path: "addBooksForm",
        Component: AddBooksForm,
      },
    ],
  },
]);
