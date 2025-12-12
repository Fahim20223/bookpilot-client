import React from "react";
import { useForm } from "react-hook-form";

const UpdateBookForm = ({ book, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: book?.name,
      status: book?.status,
      description: book?.description,
      price: book?.price,
      quantity: book?.quantity,
    },
  });

  const submitHandler = (data) => {
    // Remove the file array if no new image is selected
    if (!data.image || data.image.length === 0) {
      delete data.image;
    }

    onSubmit(data);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl min-h-screen">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 gap-10 border border-gray-200 rounded-2xl p-8">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Name</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
                {...register("name", { required: true })}
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Status</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
                {...register("status", { required: true })}
              >
                <option value="published">published</option>
                <option value="unpublished">unpublished</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Description</label>
              <textarea
                {...register("description")}
                className="block w-full h-32 px-4 py-3 border border-gray-300 rounded-md bg-white"
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Price</label>
                <input
                  {...register("price", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
                  type="number"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Quantity</label>
                <input
                  {...register("quantity", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white"
                  type="number"
                />
              </div>
            </div>

            {/* Optional Image Upload */}
            <div className="p-4 w-full rounded-lg grow">
              <div className="px-5 py-3 border-4 border-dotted border-gray-300 rounded-lg text-center">
                <label className="cursor-pointer text-gray-600 font-medium">
                  Upload New Image (if you want)
                  <input
                    {...register("image")}
                    className="hidden"
                    type="file"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-white rounded-md btn btn-primary dark:bg-orange-500"
            >
              Update Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookForm;
