import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login" || location.pathname === "/";

  const [details, setDetails] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    const registeredUser = localStorage.getItem("registeredUser");

    if (!registeredUser) {
      toast.error("Please signup first", { position: "top-center" });
      return;
    }

    const savedUser = JSON.parse(registeredUser);

    if (
      savedUser.email !== details.email ||
      savedUser.password !== details.password
    ) {
      toast.error("Invalid credentials", { position: "top-center" });
      return;
    }

    localStorage.setItem("user", JSON.stringify(savedUser));

    navigate("/admin", { replace: true });
    toast.success("Login successfully!", { position: "top-center" });
  };

  useEffect(() => {
    const registeredUser = localStorage.getItem("registeredUser");
    if (registeredUser) {
      const user = JSON.parse(registeredUser);
      const email = user.email;
      const password = user.password;
      setDetails({ ...details, email, password });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm h-150 overflow-auto">
        <h2 className="flex justify-center text-3xl font-bold text-foreground mb-2">
          Welcome
        </h2>

        <p className="flex justify-center text-md text-gray-600 mb-8">
          login to continue or create new Account
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

        <div className="grid">
          <label className="text-blue-600 my-2">Email</label>
          <input
            value={details?.email}
            type="email"
            className="border px-2 py-2 rounded-md"
            placeholder="john@example.com"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />

          <label className="text-blue-600 my-2">Password</label>
          <input
            value={details?.password}
            type="password"
            className="border px-2 py-2 rounded-md"
            placeholder="Enter password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />

          <Link
            to="/forgot-password"
            className="inline-flex ml-auto justify-end my-2 text-blue-600"
          >
            Forgot Password?
          </Link>

          <button
            className="flex items-center justify-center gap-2 px-10 py-2 mt-4 cursor-pointer rounded-md bg-blue-600 text-white"
            onClick={handleSignIn}
          >
            Login <FiLogIn />
          </button>

          <p className="text-md text-gray-500 mt-3 text-center">
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
