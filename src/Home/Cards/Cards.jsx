import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../Card/Card";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Cards = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  const sanitizedSearch = search.trim();

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["books", sanitizedSearch, order],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
        params: {
          search: sanitizedSearch,
          sort: "price",
          order,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-10 min-h-[63vh] caret-transparent">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 px-7 justify-between">
        <input
          type="text"
          placeholder="Search book name..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Loader */}
      {isLoading && <LoadingSpinner />}

      {/* Cards */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 w-[90%] mx-auto">
          {cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 text-3xl">No books found</p>
        )
      )}
    </div>
  );
};

export default Cards;
