import { FaUserCog, FaUserTag } from "react-icons/fa";
import MenuItem from "../MenuItem/MenuItem";
import { Link, NavLink } from "react-router";
import { SiManageiq } from "react-icons/si";

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
        label="Librarian Request"
        address={"seller-request"}
      ></MenuItem>
      <NavLink
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5 text-gray-800 transition-colors duration-300 transform dark:hover:bg-orange-500  hover:bg-purple-500 hover:text-white ${
            isActive
              ? "bg-purple-600 dark:bg-orange-400 text-white font-bold"
              : "dark:text-gray-300 font-bold"
          }`
        }
        to={"/dashboard/manage-books"}
      >
        <SiManageiq />
        <span className="mx-4 font-medium">Manage Books</span>
      </NavLink>
    </>
  );
};
export default AdminMenu;
