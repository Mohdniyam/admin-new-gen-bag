import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

type Role = "SUPER_ADMIN" | "SUPPLIER" | "CUSTOMER";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "SUPPLIER" as Role, // default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, role } = formData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://ngtest.newgeebags.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        },
      );

      const data = await res.json();
      console.log("SIGNUP_RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Save for login autofill
      localStorage.setItem(
        "signupCreds",
        JSON.stringify({
          email,
          password,
        }),
      );

      toast.success("Signup successful! Please login.", {
        position: "top-center",
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Signup failed", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="flex justify-center text-3xl font-bold mb-2">Welcome</h2>

        <p className="flex justify-center text-md text-gray-600 mb-8">
          Please signup to continue
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

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="grid" onSubmit={handleSubmit}>
          <label className="text-blue-600 my-2">Username</label>
          <input
            type="text"
            className="border px-2 py-2 rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label className="text-blue-600 my-2">Role</label>
          <select
            className="border p-2 rounded-md"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as Role })
            }
          >
            <option value="SUPPLIER">Supplier</option>
            <option value="CUSTOMER">Customer</option>
          </select>

          <label className="text-blue-600 my-2">Email</label>
          <input
            type="email"
            className="border p-2 rounded-md"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label className="text-blue-600 my-2">Password</label>
          <input
            type="password"
            className="border p-2 rounded-md"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-10 py-2 mt-6 rounded-md bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"} <FiLogIn />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
