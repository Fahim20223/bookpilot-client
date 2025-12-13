import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Card from "../../../../../Home/Card/Card";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";
import MyWishlists from "../../../Customer/MyWishlists/MyWishlists";

const WishlistItem = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: cards = [],
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["my-wishlists"],
    queryFn: async () => {
      const result = await axiosSecure(`/my-wishlists`);
      return result.data;
    },
  });

  // console.log("Books data:", cards);
  //   console.log("Loading:", isLoading);
  //   console.log("Error:", isError);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      {cards && cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5  gap-3 ">
          {cards.map((card) => (
            <MyWishlists key={card._id} card={card}></MyWishlists>
            // <Card key={card._id} card={card} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default WishlistItem;
