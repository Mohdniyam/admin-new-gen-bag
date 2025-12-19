import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------- Handle Sign Up! --------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !selectedRole || !email || !password) {
      return alert("All fields are required");
    }

    const userData = { name, role: selectedRole, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/login");
    toast.success("successfully signed up!", {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm h-150 overflow-auto">
        <h2 className="flex justify-center text-3xl font-bold text-foreground mb-2">
          Welcome
        </h2>

        <p className="flex justify-center text-md text-gray-600 mb-8">
          Please signup to continue
        </p>

        <div className="flex justify-center">
          <div className="bg-[#70707040] rounded-lg flex">
            <Link
              to="/login"
              className={`px-10 py-2 rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                isLogin ? "bg-blue-600 text-white" : " text-blue-600"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-10 py-2 rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                !isLogin ? "bg-blue-600 text-white" : " text-blue-600"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <form className="grid" onSubmit={handleSubmit}>
          <label className="text-blue-600 my-2">Username</label>
          <input
            type="text"
            className="border px-2 py-2 rounded-md"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="text-blue-600 my-2">Role</label>
          <select
            className="border p-2 rounded-md"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select your role</option>
            <option value="supplier">Supplier</option>
          </select>

          <label className="text-blue-600 my-2">Email</label>
          <input
            type="email"
            className="border p-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-blue-600 my-2">Password</label>
          <input
            type="password"
            className="border p-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="flex items-center justify-center gap-2 px-10 py-2 mt-6 cursor-pointer rounded-md bg-blue-600 text-white"
            type="submit"
          >
            Sign Up <FiLogIn />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
