// import { BsFingerprint } from 'react-icons/bs'
// import { GrUserAdmin } from 'react-icons/gr'
// import MenuItem from './MenuItem'
// import { useState } from 'react'

import { useState } from "react";
import { BsFingerprint } from "react-icons/bs";
import BecomeLibrarianModal from "../../../../../Modal/BecomeLibrarianModal";
import MenuItem from "../MenuItem/MenuItem";
import { GrUserAdmin } from "react-icons/gr";

import { TbBrandWish, TbFileInvoice } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import "./CustomerMenu.css";

// import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-800  hover:bg-purple-600 hover:dark:bg-orange-500 hover:text-white cursor-pointer dark:text-white"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium caret-transparent">
          Become A Librarian
        </span>
      </div>

      <BecomeLibrarianModal closeModal={closeModal} isOpen={isOpen} />

      <NavLink
        to={"/dashboard/my-wishlists"}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform dark:hover:bg-orange-500  hover:bg-purple-500   hover:text-white ${
            isActive
              ? "bg-purple-600 dark:bg-orange-400 text-white font-bold"
              : "dark:text-gray-300 font-bold"
          }`
        }
      >
        <TbBrandWish />
        <span className="mx-4 font-medium">My Wishlists</span>
      </NavLink>
      <NavLink
        to="/dashboard/my-invoices"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform dark:hover:bg-orange-500  hover:bg-purple-500   hover:text-white ${
            isActive
              ? "bg-purple-600 dark:bg-orange-400 text-white font-bold"
              : "dark:text-gray-300 font-bold"
          }`
        }
      >
        <TbFileInvoice />
        <span className="mx-4 font-medium">My Invoices</span>
      </NavLink>
    </>
  );
};

export default CustomerMenu;
