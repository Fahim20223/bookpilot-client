import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../Card/Card";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Cards = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);

  const limit = 8;

  const sanitizedSearch = search.trim(); // 🔹 trim spaces

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["books", sanitizedSearch, order, page],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
        params: {
          search: sanitizedSearch,
          sort: "price",
          order,
          limit,
          skip: page * limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(cards.length / limit);

  return (
    <div className="max-w-7xl mx-auto py-10 min-h-[63vh]">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 px-7 justify-between">
        <input
          type="text"
          placeholder="Search book name..."
          className="input input-bordered"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); // keep the typed value
            setPage(0);
          }}
        />

        <select
          className="select select-bordered"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(0);
          }}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Loader */}
      {isLoading && <LoadingSpinner />}
      {/* {isFetching && !isLoading && (
        <p className="text-center text-sm text-gray-500 mb-4">Searching...</p>
      )} */}

      {/* Cards */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
          {cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 text-5xl">No books found</p>
        )
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`btn btn-sm ${
                page === num ? "btn-primary" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
