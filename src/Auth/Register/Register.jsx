import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="flex min-h-screen  items-center">
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <form

            // onSubmit={handleSubmit(handleRegistration)}
            >
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
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input rounded-full focus:border-0 focus:outline-gray-200"
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
                  className={`btn text-white mt-4 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 
             hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600`}
                >
                  Register
                </button>
              </fieldset>
            </form>

            <button
              //   onClick={handleGoogleSignIn}
              className="btn bg-white rounded-full text-black border-[#e5e5e5]"
            >
              <FcGoogle />
              Login with Google
            </button>
            <p className="text-center">
              Already have an account? Please{" "}
              <Link
                href={"/pages/login"}
                className="text-blue-500 hover:text-blue-800"
              >
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
