import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import Card from "../../Home/Card/Card";

// import Card from "../Card/Card";
// import LoadingSpinner from "../../Components/LoadingSpinner";

const LatestBooks = () => {
  const {
    data: books = [],
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/latest-books`
      );
      return result.data;
    },
  });

  // console.log("Books data:", cards);
  //   console.log("Loading:", isLoading);
  //   console.log("Error:", isError);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  //   if (isError) {
  //     return (
  //       <div className="max-w-7xl mx-auto py-10 text-center">
  //         <div className="text-error text-xl font-semibold">
  //           Error loading books
  //         </div>
  //         <p className="text-gray-600 mt-2">
  //           {error?.message || "Please try again later"}
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <div className="max-w-7xl mx-auto py-10">
      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
          {books.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LatestBooks;
