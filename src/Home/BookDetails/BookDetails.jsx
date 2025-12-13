import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import LoadingSpinner from "../../Components/LoadingSpinner";
import PurchaseModal from "../../Modal/PurchaseModal";

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const {
    data: book = {},
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const { image, name, status, description, price, seller, quantity } = book;

  const handleWishlists = () => {
    const finalData = {
      image: image,
      name: name,
      status: "",
    };
  };

  return (
    <div className="min-h-[63vh]">
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="mx-auto flex flex-col md:flex-row justify-between w-full gap-12 p-6 md:p-8">
            {/* LEFT IMAGE */}
            <div className="flex-1">
              <img
                src={image}
                alt={name}
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>

            {/* RIGHT INFO */}
            <div className="flex flex-col gap-6 flex-1">
              <Heading title={name} subtitle={`Status: ${status}`} />

              <div className="text-lg text-neutral-600 dark:text-white">
                {description}
              </div>

              <div className="flex items-center gap-3 text-xl font-semibold">
                <div>Seller: {seller?.name}</div>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={seller?.image}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="w-1/2 btn btn-outline rounded-full border-gray-300 hover:border-purple-500 hover:text-purple-600">
                Add to Favorites
              </button>

              <p className="text-neutral-500">
                Quantity: {quantity} Units Left Only!
              </p>

              {/* <div className="flex justify-between items-center mt-4"> */}
              <p className="font-bold text-3xl text-gray-500">
                Price: {price}$
              </p>
              <Button onClick={() => setIsOpen(true)} label="Order Now" />
              {/* </div> */}
              <PurchaseModal
                book={book}
                closeModal={closeModal}
                isOpen={isOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
