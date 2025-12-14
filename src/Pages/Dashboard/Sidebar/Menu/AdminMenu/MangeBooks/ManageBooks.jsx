import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import ManageAllBooks from "./ManageAllBooks";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const result = await axiosSecure(`/manage-books`);
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
          All the books added by the librarians
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {books.length} books total
        </p>
      </div>

      {books && books.length > 0 ? (
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
                {books.map((book, index) => (
                  <ManageAllBooks
                    refetch={refetch}
                    key={book._id}
                    book={book}
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
            There is no book added by the librarian
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
