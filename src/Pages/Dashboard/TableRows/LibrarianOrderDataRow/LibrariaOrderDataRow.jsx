// import { useState } from "react";

import { useState } from "react";
import DeleteModal from "../../../../Modal/DeleteModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

// import DeleteModal from "../../Modal/DeleteModal";
const LibrarianOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const { name, price, quantity, status, customer } = order || {};

  const cancelOrder = async () => {
    try {
      const result = await axiosSecure.delete(`manage-orders/${order._id}`);
      if (result.data.deletedCount > 0) {
        toast.success("Order cancelled successfully");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Cancel order failed");
    } finally {
      closeModal();
    }
  };

  return (
    <tr className="caret-transparent hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700 bg-white">
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <p className="">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <p className="">{customer}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <p className="">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <p className="">{quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <p className="">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 text-gray-700 dark:text-gray-300 text-sm">
        <div className="flex items-center gap-2">
          <select
            required
            defaultValue={status}
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900  bg-white"
            name="category"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-red-300 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 dark:bg-red-800 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal
          cancelOrder={cancelOrder}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default LibrarianOrderDataRow;
