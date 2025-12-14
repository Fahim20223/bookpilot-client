import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";

const ManageAllBooks = ({ refetch, book, index = 0 }) => {
  const axiosSecure = useAxiosSecure();
  const { name, image, quantity, description, price, author, rating } = book;

  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-50px" });

  // Row animation variants
  const rowVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      },
    },
  };

  const handleDelete = async () => {
    const swalResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!swalResult.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/manage-books/${book._id}`);
      refetch();
      if (res.data.deletedCount > 0) {
        await Swal.fire({
          title: "Deleted!",
          text: "Book has been deleted successfully.",
          icon: "success",
        });

        // 🔁 refetch data from parent
        // pass refetch as prop
        // refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the book.",
        icon: "error",
      });
    }
  };

  return (
    <motion.tr
      ref={rowRef}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
    >
      {/* Product (Image + Name) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
            }
            alt={name}
            className="w-16 h-20 object-cover rounded-lg shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {name || "Untitled Book"}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Author */}
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {author || "Unknown Author"}
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ${price ? Number(price).toFixed(2) : "0.00"}
        </span>
        {quantity > 0 && quantity < 5 && (
          <div className="text-xs text-orange-600 font-medium mt-1">
            Only {quantity} left!
          </div>
        )}
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
            {Number(rating) ? Number(rating).toFixed(1) : "N/A"}
          </span>
        </div>
      </td>
      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={quantity === 0}
            className={`p-2 rounded-lg transition-colors ${
              quantity === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
            }`}
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <div onClick={handleDelete}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-200"
              title="Remove from Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

export default ManageAllBooks;
