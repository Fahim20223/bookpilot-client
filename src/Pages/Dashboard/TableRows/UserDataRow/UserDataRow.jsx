// import { useState } from 'react'
// import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

import { useState } from "react";
import UpdateUserRoleModal from "../../../../Modal/UpdateUserRoleModal";

const UserDataRow = ({ refetch, user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <tr className="caret-transparent hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700 bg-white">
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300  text-sm">
        <p className="">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300  text-sm">
        <p className="">{user?.role}</p>
      </td>
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">Unavailable</p>
      </td> */}

      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-300 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 dark:bg-green-800 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
