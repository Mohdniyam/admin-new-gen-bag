import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100 ">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm h-150 overflow-auto">
          <h2 className="flex justify-center font-display text-3xl font-bold text-foreground mb-2">
            Welcome
          </h2>
          <p className="flex justify-center font-display text-md text-gray-600 mb-8">
            Sign in to continue or create new Account
          </p>

          <div className="flex justify-center">
            <div className="bg-[#70707040] rounded-lg flex">
              <button
                className={`px-10 py-2 font-display rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                  isLogin ? "bg-blue-600 text-white" : " text-blue-600"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`px-10 py-2 font-display rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                  !isLogin ? "bg-blue-600 text-white" : " text-blue-600"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div>
            {isLogin ? (
              <>
                <div className="grid">
                  <label htmlFor="" className="text-blue-600 font-display my-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="border font-display px-2 py-2 rounded-md"
                  />
                  <label htmlFor="" className="text-blue-600 font-display my-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder=""
                    className="border font-display px-2 py-2 rounded-md"
                  />
                  <a
                    className="flex justify-end my-2 font-display text-blue-600"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                  <button className="flex items-center justify-center gap-2 px-10 py-2 mt-4 font-display cursor-pointer rounded-md bg-blue-600 text-white">
                    Sign In <FiLogIn className="" />
                  </button>
                  <p className="text-md font-display text-gray-500 mt-3 text-center">
                    Not an Account?{" "}
                    <a
                      href="#"
                      className="text-blue-600"
                      onClick={() => setIsLogin(false)}
                    >
                      Signup now
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <div className="grid">
                <label htmlFor="" className="text-blue-600 font-display my-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="border font-display px-2 py-2 rounded-md"
                />
                <label className="text-blue-600 font-display my-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="border font-display p-2 rounded-md"
                >
                  <option value="">Select your role</option>
                  <option value="supplier">Supplier</option>
                </select>

                <label htmlFor="" className="text-blue-600 font-display my-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="border font-display p-2 rounded-md"
                />
                <label htmlFor="" className="text-blue-600 font-display my-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="border font-display p-2 rounded-md"
                />
                <button className="flex items-center justify-center gap-2 px-10 py-2 mt-6 font-display cursor-pointer rounded-md bg-blue-600 text-white">
                  Sign Up <FiLogIn />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
