import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Home/Home";
import Coverage from "../Components/Coverage/Coverage";

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
]);
