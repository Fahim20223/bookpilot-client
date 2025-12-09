import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import AuthLayouts from "../Pages/AuthLayouts/AuthLayouts";
// import AddBooksForm from "../Pages/Dashboard/Librarian/AddBooksForm";
import PrivateRouter from "./PrivateRouter";
import DashboardLayouts from "../Pages/DashboardLayouts/DashboardLayouts";
import Books from "../Components/Books/Books";
import BookDetails from "../Home/BookDetails/BookDetails";
import PaymentSuccess from "../Payment/PaymentSuccess";
import Statistics from "../Pages/Dashboard/Common/Statistics/Statistics";
import AddBooks from "../Pages/Dashboard/Librarian/AddBooks";
import MyInventory from "../Pages/Dashboard/Librarian/MyInventory";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";
import MyOrders from "../Pages/Dashboard/Customer/MyOrders/MyOrders";
import ManageOrders from "../Pages/Dashboard/Customer/ManageOrders/ManageOrders";

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
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
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
        index: true,
        element: <Statistics></Statistics>,
      },
      {
        path: "add-books",
        element: <AddBooks></AddBooks>,
      },
      {
        path: "my-inventory",
        element: <MyInventory></MyInventory>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "manage-orders",
        element: <ManageOrders></ManageOrders>,
      },
    ],
  },
]);
