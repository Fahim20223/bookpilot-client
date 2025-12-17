import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const UpdateStatusModal = ({ book, openModal, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedStatus, setSelectedStatus] = useState(
    book.status || "published"
  );

  if (!openModal) return null; // Don't render if modal is closed

  const handleSave = async () => {
    try {
      const res = await axiosSecure.patch(`/books-status/${book._id}`, {
        status: selectedStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Book status updated", "success");
        onClose(); // Close modal
        refetch(); // Refresh the book list
      } else {
        Swal.fire("Info", "No change made", "info");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  return (
    <div className="caret-transparent fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Update Book Status
        </h2>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
