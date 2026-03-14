import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

type Role = "SUPER_ADMIN" | "SUPPLIER" | "CUSTOMER";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login" || location.pathname === "/";

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  // Optional: Auto fill from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("registeredUser");
    if (stored) {
      const user = JSON.parse(stored);
      setDetails({
        email: user.email,
        password: user.password,
      });
    }
  }, []);

  const handleSignIn = async () => {
    const { email, password } = details;

    if (!email || !password) {
      toast.error("Please fill all fields", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ngtest.newgeebags.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      console.log("LOGIN_RESPONSE:", data);

      if (!response.ok) {
        setErrorModal({
          open: true,
          message: data.message || "Login failed",
        });
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Important: Normalize role
      const backendRole = data.role?.toUpperCase() as Role;

      console.log("USER_ROLE:", backendRole);

      // Save user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          email,
          role: backendRole,
        }),
      );

      window.dispatchEvent(new Event("userLoggedIn"));

      toast.success("Login successfully!", { position: "top-center" });

      // Role based routes
      const roleRoutes: Record<Role, string> = {
        SUPER_ADMIN: "/super-admin",
        SUPPLIER: "/supplier",
        CUSTOMER: "/",
      };

      if (roleRoutes[backendRole]) {
        navigate(roleRoutes[backendRole]);
      } else {
        // Fallback if role mismatch
        console.error("Invalid role received:", backendRole);
        toast.error("Invalid role detected");
        navigate("/");
      }
    } catch (error) {
      toast.error("Server error. Please try again.", {
        position: "top-center",
      });
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="flex justify-center text-3xl font-bold mb-2">Welcome</h2>

        <p className="flex justify-center text-md text-gray-600 mb-8">
          Login to continue
        </p>

        <div className="flex justify-center mb-6">
          <div className="bg-[#70707040] rounded-lg flex">
            <Link
              to="/login"
              className={`px-10 py-2 rounded-md transition ${
                isLogin ? "bg-blue-600 text-white" : "text-blue-600"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-10 py-2 rounded-md transition ${
                !isLogin ? "bg-blue-600 text-white" : "text-blue-600"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="grid">
          <label className="text-blue-600 my-2">Email</label>
          <input
            value={details.email}
            type="email"
            className="border px-2 py-2 rounded-md"
            placeholder="john@example.com"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />

          <label className="text-blue-600 my-2">Password</label>
          <input
            value={details.password}
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
            className="flex items-center justify-center gap-2 px-10 py-2 mt-4 rounded-md bg-blue-600 text-white disabled:opacity-50"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"} <FiLogIn />
          </button>

          <p className="text-md text-gray-500 mt-3 text-center">
            Not an Account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup now
            </Link>
          </p>
        </div>
        {errorModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
              <h3 className=" font-semibold mb-4 text-black">Login Error {}</h3>

              <p className="text-sm text-gray-700 mb-6">{errorModal.message}</p>

              <button
                onClick={() => setErrorModal({ open: false, message: "" })}
                className="text-sm px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
