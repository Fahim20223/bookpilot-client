import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
// import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../../utils";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { signInUser, signInWithGoogle, setUser } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const from = location.state || "/";

  console.log("in the login page", location);

  const handleLogin = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);

      //save/update user in backend
      await saveOrUpdateUser({
        name: result.user.displayName || "null",
        email: result.user.email,
        image: result.user.photoURL || "",
      });
      setUser({ ...result.user });
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  //   console.log("form data", data);
  //   signInUser(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       navigate(location?.state || "/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleGoogleSignIn = () => {
  //   signInWithGoogle()
  //     .then(() => {
  //       // console.log("Google Sign-In Result:", result);
  //       // console.log("Google User Photo:", result.user.photoURL);
  //       // console.log("Google User Name:", result.user.displayName);
  //       // setUser;
  //       navigate(location?.state || "/");
  //     })
  //     .catch((error) => {
  //       console.log("Google Sign-In Error:", error);
  //     });
  // };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      // Save or update user in DB
      await saveOrUpdateUser({
        name: user.displayName || "No Name",
        email: user.email,
        image: user.photoURL || "",
      });

      // Update frontend user state
      setUser({ ...user });

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-gray-200">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Please Enter Your Email</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Password"
              />
              {/* my client  */}
              {errors.password && (
                <p className="text-red-500">Please Enter Your Password</p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn text-white mt-4 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600"
              >
                Login
              </button>
            </fieldset>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white rounded-full text-black border-[#e5e5e5] mt-3 w-full flex items-center justify-center gap-2"
          >
            <FcGoogle /> Login with Google
          </button>

          <p className="text-center mt-3">
            New to our website?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-800">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
