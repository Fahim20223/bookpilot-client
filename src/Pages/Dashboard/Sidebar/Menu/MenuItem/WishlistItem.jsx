import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";
import MyWishlists from "../../../Customer/MyWishlists/MyWishlists";

const WishlistItem = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: cards = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-wishlists"],
    queryFn: async () => {
      const result = await axiosSecure(`/my-wishlists`);
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {cards.length} items in your wishlist
        </p>
      </div>

      {cards && cards.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Rating
                  </th>
                  {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <MyWishlists
                    refetch={refetch}
                    key={card._id}
                    card={card}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">
            Your wishlist is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default WishlistItem;
