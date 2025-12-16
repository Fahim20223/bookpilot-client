// import { useState } from 'react'
// import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SellerRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: req?.email,
        role: "librarian",
      });
      toast.success("Role Updated!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <tr className="dark:bg-gray-700 transaction-colors border-b border-gray-200 dark:border-gray-700 overflow-hidden caret-transparent">
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p>{req?.email}</p>
      </td>
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">Customer</p>
      </td> */}
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">Unavailable</p>
      </td> */}

      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <span
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-400 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 dark:text-green-800 opacity-50 rounded-full"
          ></span>
          <span className="relative">Make Librarian</span>
        </span>
        {/* Modal
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          role="customer"
        /> */}
      </td>
    </tr>
  );
};

export default SellerRequestsDataRow;
