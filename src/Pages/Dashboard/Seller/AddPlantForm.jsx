import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AddPlantForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const onSubmit = (data) => {
    const profileImg = data.photoURL[0];
  };

  return (
    <div>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="name"
                  type="text"
                  placeholder="Plant Name"
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
                <label htmlFor="status" className="block text-gray-600 ">
                  Status
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="Indoor">published</option>
                  <option value="Outdoor">unpublished</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Write plant description here..."
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
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
                  <label htmlFor="price" className="block text-gray-600 ">
                    Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
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
                  <label htmlFor="quantity" className="block text-gray-600">
                    Quantity
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
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
                      <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                        Upload
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
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

export default AddPlantForm;
