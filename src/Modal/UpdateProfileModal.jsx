import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const UpdateProfileModal = ({ isOpen, closeModal }) => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    if (user && isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(user?.displayName || "");
      setEmail(user?.email || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(name, photoURL);
    setUser({
      ...user,
      displayName: name,
      photoURL,
      email,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Email (read only)
            </label>
            <input
              value={email}
              disabled
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Photo URL
            </label>
            <input
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
