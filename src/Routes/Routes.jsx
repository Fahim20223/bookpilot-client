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
import SellerRequests from "../Pages/Dashboard/Admin/SellerRequests";
import SellerRoutes from "./SellerRoutes";
import AdminRoute from "./AdminRoute";
import PaymentCancel from "../Payment/PaymentCancel";
import UpdateBookForm from "../Form/UpdateBookForm";
import UpdateBookPage from "../Form/UpdateBookPage";
import WishlistItem from "../Pages/Dashboard/Sidebar/Menu/MenuItem/WishlistItem";
import ManageBooks from "../Pages/Dashboard/Sidebar/Menu/AdminMenu/MangeBooks/ManageBooks";
import MyInvoices from "../Pages/Dashboard/Customer/MyInvoices/MyInvoices";
import ContactUs from "../Components/ContactUs/ContactUs";
import AboutUs from "../Components/AboutUs/AboutUs";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
        path: "/contact",
        element: (
          <PrivateRouter>
            <ContactUs></ContactUs>
          </PrivateRouter>
        ),
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/books/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancel></PaymentCancel>,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayouts,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Statistics></Statistics>,
      },
      {
        path: "my-invoices",
        element: (
          <PrivateRouter>
            <MyInvoices></MyInvoices>
          </PrivateRouter>
        ),
      },
      {
        path: "my-wishlists",
        element: (
          <PrivateRouter>
            <WishlistItem></WishlistItem>
          </PrivateRouter>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ManageBooks></ManageBooks>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "add-books",
        element: (
          <PrivateRouter>
            <SellerRoutes>
              <AddBooks></AddBooks>
            </SellerRoutes>
          </PrivateRouter>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRouter>
            <SellerRoutes>
              <MyInventory></MyInventory>
            </SellerRoutes>
          </PrivateRouter>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "seller-request",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <SellerRequests />
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRouter>
            <MyOrders></MyOrders>
          </PrivateRouter>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRouter>
            <SellerRoutes>
              <ManageOrders></ManageOrders>
            </SellerRoutes>
          </PrivateRouter>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRouter>
            <SellerRoutes>
              <UpdateBookPage />
            </SellerRoutes>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
