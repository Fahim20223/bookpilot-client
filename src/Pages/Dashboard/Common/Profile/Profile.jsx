import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import coverImg from "../../../../assets/cover.png";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log(role, isRoleLoading);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={coverImg}
            alt="cover"
            className="w-full h-56 object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-16 px-6 pb-6">
          <p className="inline-block px-4 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full shadow-md">
            {role || "Loading..."}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-800">
            {user?.displayName || "User Name"}
          </h2>
          <p className="mt-1 text-gray-500 text-sm">User ID: {user?.uid}</p>

          {/* Info Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold text-gray-800">{user?.displayName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{user?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1">
              Update Profile
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
