import { FaUserCog, FaUserTag } from "react-icons/fa";
import MenuItem from "../MenuItem/MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Manage Users"
        address={"manage-users"}
      ></MenuItem>
      <MenuItem
        icon={FaUserTag}
        label="Seller Request"
        address={"seller-request"}
      ></MenuItem>
    </>
  );
};
export default AdminMenu;
