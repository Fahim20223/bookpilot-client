import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import LoadingSpinner from "../../Components/LoadingSpinner";
import PurchaseModal from "../../Modal/PurchaseModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const BookDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const {
    image,
    name,
    status,
    description,
    price,
    seller,
    quantity,
    author,
    rating,
  } = book;

  const handleWishlists = async () => {
    try {
      const wishlistData = {
        bookId: id,
        image,
        name,
        author,
        description,
        rating,
        price,
      };
      const res = await axiosSecure.post(`/wishlists/${id}`, wishlistData);

      if (res.data.insertedId) toast.success("Added to wishlist ❤️");
    } catch (error) {
      if (error.response?.status === 409)
        toast.error("Already added to wishlist");
      else toast.error("Failed to add wishlist");
    }
  };

  return (
    <div className="min-h-[65vh] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT IMAGE */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative group">
              <img
                src={image}
                alt={name}
                className="w-full rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                {status}
              </span>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Heading title={name} subtitle={`by ${author}`} />

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                src={seller?.image}
                alt={seller?.name}
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {seller?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Seller
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                Quantity: <span className="text-purple-600">{quantity}</span>{" "}
                units left
              </p>

              {user && (
                <button
                  onClick={handleWishlists}
                  className="btn btn-purple-outline w-full sm:w-auto"
                >
                  Add to Wishlist
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <p className="text-2xl font-bold text-purple-700">${price}</p>

              {user ? (
                <Button onClick={() => setIsOpen(true)} label="Order Now" />
              ) : (
                <Button label="Login to Buy" />
              )}
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default BookDetails;
