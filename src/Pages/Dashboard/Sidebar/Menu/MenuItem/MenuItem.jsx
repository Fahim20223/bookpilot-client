/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform dark:hover:bg-orange-500  hover:bg-purple-500   hover:text-white ${
          isActive
            ? "bg-purple-600 dark:bg-orange-400 text-white font-bold"
            : "dark:text-gray-300 font-bold"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
