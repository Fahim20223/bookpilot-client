import LoadingSpinner from "../../../../Components/LoadingSpinner";
import useRole from "../../../../hooks/useRole";
import AdminStatistics from "./AdminStatistics";
import CustomerStatistics from "./CustomerStatistics";
import SellerStatistics from "./SellerStatistics";

const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      {role === "admin" && <AdminStatistics></AdminStatistics>}
      {role === "customer" && <CustomerStatistics></CustomerStatistics>}
      {role === "seller" && <SellerStatistics></SellerStatistics>}
    </div>
  );
};

export default Statistics;
