import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaBook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile, signInWithGoogle, setUser } =
    useAuth();

  const location = useLocation();

  console.log("in register", location);

  const navigate = useNavigate();
  const from = location.state || "/";

  const handleRegistration = async (data) => {
    const { name, photoURL, email, password } = data;
    const imageFile = photoURL[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const result = await registerUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });

      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Register Successful");

      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.name,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Register Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-linear-to-br from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
              <FaBook className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join BookPilot and start your reading adventure
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-5"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition duration-200"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                PhotoURL
              </label>
              <input
                type="file"
                {...register("photoURL", { required: true })}
                className="file-input w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition duration-200 h-full"
                placeholder="Photo URL"
              />
              {errors.photoURL?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Photo is required</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition duration-200"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition duration-200"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 character long
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one number, and one special character
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition duration-200 dark:bg-orange-500 dark:hover:bg-purple-600"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              OR
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Google Register Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-3"
          >
            <FcGoogle className="text-2xl" />
            Login with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account? Please{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          By creating an account, you agree to BookPilot's Terms of Service and
          Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;
