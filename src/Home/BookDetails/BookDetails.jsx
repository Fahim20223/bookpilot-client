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
    <div className="min-h-screen bg-gray-100 dark:bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 caret-transparent">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl dark:border border-gray-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT IMAGE SECTION */}
            <div className="md:col-span-1 flex justify-center p-6 lg:p-8  dark:bg-gray-900 md:h-120 h-96">
              <div className="relative group">
                {/* <div className="absolute inset-0 bg-linear-to-t from-purple-600/20 to-transparent rounded-xl"></div> */}
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-105 h-full object-cover"
                />
                <span className="absolute top-4 right-4 bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-purple-500/30">
                  {status}
                </span>
              </div>
            </div>

            {/* RIGHT INFO SECTION */}
            <div className="md:col-span-1 p-6 flex flex-col gap-6">
              {/* Title */}
              <div className="border-b border-gray-700/50 pb-4">
                <h1 className="text-3xl lg:text-4xl font-bold dark:text-white mb-2">
                  {name}
                </h1>
                <p className="text-purple-600 text-lg font-medium">
                  by {author}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="dark:bg-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                  <p className="dark:text-gray-400 text-sm mb-1">Author</p>
                  <p className="dark:text-white font-semibold">{author}</p>
                </div>
                <div className="dark:bg-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                  <p className="dark:text-gray-400 text-sm mb-1">Rating</p>
                  <p className="text-yellow-500 dark:text-yellow-400 font-semibold">
                    ⭐ {rating}
                  </p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="dark:bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
                <p className="dark:text-gray-400 text-sm mb-3">Seller</p>
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/50 shadow-lg"
                    src={seller?.image}
                    alt={seller?.name}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="dark:text-white font-semibold text-lg">
                      {seller?.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Verified Seller
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {user ? (
                  <>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="flex-1 bg-linear-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 border border-green-500/30"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={handleWishlists}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg"
                    >
                      Add to Wishlist
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full bg-linear-to-r
                  bg-purple-600 dark:from-amber-600 dark:to-amber-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 border border-purple-500/30"
                  >
                    Login to Buy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl dark:border dark:border-gray-800 p-6 lg:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold dark:text-white mb-4 border-b border-gray-700/50 pb-3">
            About {name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
            {description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Availability */}
          <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl dark:border dark:border-gray-800 p-6 shadow-2xl">
            <h3 className="text-xl font-bold dark:text-white mb-4 border-b border-gray-700/50 pb-3">
              Availability
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 text-gray-700">
                  Stock Status
                </span>
                <span className="dark:text-white font-semibold">{status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 text-gray-700">
                  Quantity
                </span>
                <span className="dark:text-purple-400 text-purple-600 font-bold">
                  {quantity} units
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl dark:border dark:border-gray-800 p-6 shadow-2xl">
            <h3 className="text-xl font-bold dark:text-white mb-4 border-b border-gray-700/50 pb-3">
              Pricing
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 text-gray-700">Price</span>
                <span className="text-3xl font-bold dark:text-white">
                  ${price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default BookDetails;
