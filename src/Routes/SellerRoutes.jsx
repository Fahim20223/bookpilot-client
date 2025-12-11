import { Navigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../hooks/useRole";

const SellerRoutes = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "librarian") return children;
  return <Navigate to="/" replace="true" />;
};

export default SellerRoutes;
