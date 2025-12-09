import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "../MenuItem/MenuItem";
// import MenuItem from "./MenuItem";
const LibrarianMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Books"
        address="add-books"
      />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
    </>
  );
};

export default LibrarianMenu;
