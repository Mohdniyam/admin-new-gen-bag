import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login" || location.pathname === "/";

  const handleSignIn = () => {
    localStorage.setItem("token", "dummy_token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm h-150 overflow-auto">
        <h2 className="flex justify-center font-display text-3xl font-bold text-foreground mb-2">
          Welcome
        </h2>

        <p className="flex justify-center font-display text-md text-gray-600 mb-8">
          login to continue or create new Account
        </p>

        <div className="flex justify-center">
          <div className="bg-[#70707040] rounded-lg flex">
            <Link
              to="/login"
              className={`px-10 py-2 font-display rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                isLogin ? "bg-blue-600 text-white" : " text-blue-600"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-10 py-2 font-display rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                !isLogin ? "bg-blue-600 text-white" : " text-blue-600"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="grid">
          <label className="font-display text-blue-600 my-2">Email</label>
          <input
            type="email"
            className="font-display border px-2 py-2 rounded-md"
            placeholder="john@example.com"
          />

          <label className="font-display text-blue-600 my-2">Password</label>
          <input
            type="password"
            className="font-display border px-2 py-2 rounded-md"
            placeholder="Enter password"
          />

          <Link
            to="/forgot-password"
            className="inline-flex ml-auto justify-end my-2 font-display text-blue-600"
          >
            Forgot Password?
          </Link>

          <button
            className="flex items-center justify-center gap-2 px-10 py-2 mt-4 font-display cursor-pointer rounded-md bg-blue-600 text-white"
            onClick={handleSignIn}
          >
            Login <FiLogIn />
          </button>

          <p className="text-md font-display text-gray-500 mt-3 text-center">
            Not an Account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
