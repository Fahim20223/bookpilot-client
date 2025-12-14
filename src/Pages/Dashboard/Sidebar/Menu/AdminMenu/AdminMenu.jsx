import { FaUserCog, FaUserTag } from "react-icons/fa";
import MenuItem from "../MenuItem/MenuItem";
import { Link } from "react-router";
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
      <Link
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        to={"/dashboard/manage-books"}
      >
        <SiManageiq />
        <span className="mx-4 font-medium">Manage Books</span>
      </Link>
    </>
  );
};
export default AdminMenu;
