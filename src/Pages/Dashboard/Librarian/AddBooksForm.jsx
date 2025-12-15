import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils";
// import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../Components/ErrorPage/ErrorPage";

const AddBooksForm = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationRest,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/books`, payload),
    onSuccess: (data) => {
      console.log(data);
      //show toast
      toast.success("Books Added Successfully");
      mutationRest();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data---->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled---->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const onSubmit = async (data) => {
    const {
      name,
      status,
      description,
      price,
      quantity,
      image,
      author,
      rating,
    } = data;
    // const profileImg = data.photoURL[0];
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const bookData = {
        image: imageUrl,
        name,
        status,
        description,
        price: Number(price),
        quantity: Number(quantity),
        author,
        rating,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      await mutateAsync(bookData);
      reset();

      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/books`,
      //   bookData
      // );
      // console.log(data);
    } catch (error) {
      console.log(error);
    }

    // console.log(data);
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (isError) return <ErrorPage />;

  return (
    <div>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border border-gray-200 p-8 rounded-2xl">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="name"
                  className="block text-gray-600 dark:text-white"
                >
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-300 focus:outline-purple-500 rounded-md bg-white"
                  id="name"
                  type="text"
                  placeholder="Book Name"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be too long",
                    },
                  })}
                />

                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* Status */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="status"
                  className="block text-gray-600 dark:text-white "
                >
                  Status
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-purple-300 focus:outline-purple-500 rounded-md bg-white border"
                  name="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="published">published</option>
                  <option value="unpublished">unpublished</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="description"
                  className="block text-gray-600 dark:text-white"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Write book description here..."
                  className="block rounded-md focus:purple-300 w-full h-32 px-4 py-3 text-gray-800  border border-purple-300 bg-white focus:outline-purple-500 "
                  name="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6 flex flex-col">
              {/* Price & Quantity */}
              <div className="flex justify-between gap-2">
                {/* Price */}
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="price"
                    className="block text-gray-600 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-300 focus:outline-purple-500 rounded-md bg-white"
                    id="price"
                    type="number"
                    placeholder="Price per unit"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-600 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-300 focus:outline-purple-500 rounded-md bg-white"
                    id="quantity"
                    type="number"
                    placeholder="Available quantity"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Image */}
              <div className=" p-4  w-full  m-auto rounded-lg grow">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                        {...register("image", {
                          required: "Image is required",
                        })}
                      />
                      {errors.image && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.image.message}
                        </p>
                      )}
                      <div className="bg-purple-500 dark:bg-amber-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-500">
                        Upload
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="author"
                  className="block text-gray-600 dark:text-white"
                >
                  Author
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-300 focus:outline-purple-500 rounded-md bg-white"
                  id="author"
                  type="text"
                  placeholder="Book Author"
                  {...register("author", {
                    required: "Author is required",
                    maxLength: {
                      value: 30,
                      message: "Author name cannot be too long",
                    },
                  })}
                />

                {errors.author && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="rating"
                  className="block text-gray-600 dark:text-white"
                >
                  Rating (1–5)
                </label>

                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-300 focus:outline-purple-500 rounded-md bg-white"
                  id="rating"
                  type="number"
                  placeholder="Rate 1 to 5"
                  min="1"
                  max="5"
                  step="0.1"
                  {...register("rating", {
                    required: "Rating is required",
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 5, message: "Maximum rating is 5" },
                  })}
                />

                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-purple-500 dark:bg-amber-500"
              >
                {isPending ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooksForm;
