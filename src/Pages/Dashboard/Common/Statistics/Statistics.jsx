import LoadingSpinner from "../../../../Components/LoadingSpinner";
import useRole from "../../../../hooks/useRole";
import AdminStatistics from "./AdminStatistics";

const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;
  return <div>{role === "admin" && <AdminStatistics></AdminStatistics>}</div>;
};

export default Statistics;
