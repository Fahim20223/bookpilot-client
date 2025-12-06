import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile, signInWithGoogle } = useAuth();

  const location = useLocation();

  console.log("in register", location);

  const navigate = useNavigate();

  const handleRegistration = (data) => {
    console.log("after register", data.photoURL[0]);
    const profileImg = data.photoURL[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //store the image in form data

        const formData = new FormData();

        formData.append("image", profileImg);

        //send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          //update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex min-h-screen  items-center">
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset">
                {/* name field */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input rounded-full focus:border-0 focus:outline-gray-200"
                  placeholder="Name"
                />

                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name is required</p>
                )}

                <label className="label">PhotoURL</label>
                <input
                  type="file"
                  {...register("photoURL", { required: true })}
                  className="file-input rounded-full focus:border-0 focus:outline-gray-200"
                  placeholder="Photo URL"
                />

                {errors.photoURL?.type === "required" && (
                  <p className="text-red-500">Photo is required</p>
                )}

                {/* email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input rounded-full focus:border-0 focus:outline-gray-200"
                  placeholder="Email"
                />

                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}

                {/* password field */}
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                  className="input rounded-full focus:border-0 focus:outline-gray-200"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}

                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 character long
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number, and one special character
                  </p>
                )}

                {/* {passError && <p className="text-xs text-error">{passError}</p>} */}
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className={`btn text-white mt-4 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 
             hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600`}
                >
                  Register
                </button>
              </fieldset>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white rounded-full text-black border-[#e5e5e5]"
            >
              <FcGoogle />
              Login with Google
            </button>
            <p className="text-center">
              Already have an account? Please{" "}
              <Link to={"/login"} className="text-blue-500 hover:text-blue-800">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
