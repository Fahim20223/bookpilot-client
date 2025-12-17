import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";

const UpdateProfileModal = ({ isOpen, closeModal }) => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  useEffect(() => {
    if (user && isOpen) {
      reset({
        name: user.displayName || "",
      });
      setPreview(user.photoURL || "");
    }
  }, [user, isOpen, reset]);

  // show preview when new image selected
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setPreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = user.photoURL;

      // upload new image only if selected
      if (data.image?.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      await updateUserProfile(data.name, photoURL);

      setUser({
        ...user,
        displayName: data.name,
        photoURL,
      });

      toast.success("Profile updated successfully");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm">Name</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input
              disabled
              value={user?.email || ""}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-900"
            />
          </div>

          <div className="p-4 border-4 border-dotted rounded-lg text-center">
            {preview && (
              <img
                src={preview}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
            )}

            <label>
              <input
                type="file"
                accept="image/*"
                hidden
                {...register("image")}
              />
              <div className="bg-purple-600 text-white px-4 py-1 rounded cursor-pointer inline-block">
                Upload New Photo
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-amber-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-purple-600 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
