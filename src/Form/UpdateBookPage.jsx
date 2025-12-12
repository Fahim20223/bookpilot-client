import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import UpdateBookForm from "./UpdateBookForm";
import Swal from "sweetalert2";

const UpdateBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/books/${id}`).then((res) => {
      setBook(res.data);
    });
  }, [id, axiosSecure]);

  const handleUpdate = async (data) => {
    await axiosSecure.put(`books/${id}`, data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Book has been Updated",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/dashboard/my-inventory");
  };

  if (!book) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <UpdateBookForm book={book} onSubmit={handleUpdate} />
    </div>
  );
};

export default UpdateBookPage;
