// import { useState } from 'react'
// import DeleteModal from '../../Modal/DeleteModal'
// import UpdatePlantModal from '../../Modal/UpdatePlantModal'

import { useState } from "react";
import UpdateBookModal from "../../../../Modal/UpdateBookModal";
import DeleteModal from "../../../../Modal/DeleteModal";
import { Link } from "react-router";

const BookDataRow = ({ book }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const { image, name, status, quantity, price } = book;
  return (
    <tr className="caret-transparent hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700 bg-white">
      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300 text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300  text-sm">
        <p className="">{name}</p>
      </td>
      {/* <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td> */}
      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300 text-sm">
        <p className="">${price}</p>
      </td>
      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300  text-sm">
        <p className="">{quantity}</p>
      </td>

      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300  text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-red-200 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 dark:bg-red-800 opacity-50 rounded-full"
          ></span>
          <span className="relative">{status}</span>
        </span>
        {/* <DeleteModal isOpen={isOpen} closeModal={closeModal} /> */}
      </td>
      <td className="px-5 py-5 border-b text-gray-700 dark:text-gray-300 text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-500 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 dark:bg-green-800 opacity-50 rounded-full"
          ></span>
          <Link to={`/dashboard/update-book/${book._id}`} className="relative">
            Edit
          </Link>
        </span>
        {/* <UpdateBookModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        /> */}
      </td>
    </tr>
  );
};

export default BookDataRow;
