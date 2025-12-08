import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";

const BookDetails = () => {
  const { isOpen, setIsOpen } = useState(false);
  const { id } = useParams();
  const {
    data: book = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {},
  });

  return <div>hi</div>;
};

export default BookDetails;
