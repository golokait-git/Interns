import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loginType, setLoginType] = useState("Admin");
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const { setIsLoggedIn, login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email and password are provided
  if (!values.email || !values.password) {
    setError("Please provide both email and password.");
    return;
  }

    const loginEndpoint =
      loginType === "Admin"
        ? "http://localhost:5000/auth/adminlogin"
        : "http://localhost:5000/employee/employee_login";

    axios
      .post(loginEndpoint, values)
      .then((result) => {
        if (result.data.loginStatus) {
          setIsLoggedIn(true);
          handleSuccessfulLogin(result.data.id, result.data.role); // Pass the id
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error during login request:", err);
        setError("Network Error. Please try again.");
      });
  };

  const handleSuccessfulLogin = (id, role) => {
    setSelectedType(loginType);
    if (loginType === "Admin") {
      login({
        id,
        role,
      });
      if (role === "superadmin") {
        navigate("/superAdminDashboard");
      } else if (role === "admin1") {
        navigate("/Admin1Dashboard");
      } else if (role === "admin2") {
        navigate("/Admin2Dashboard");
      }
    } else if (loginType === "Employee") {
      login({
        id,
        role: "Employee",
      });
      navigate(`/employee_detail/${id}`);
    }
  };

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="text-red-500">{error && error}</div>
          <div className="mb-8 flex flex-col items-center">
            <img src="./src/assets/goloka.png" width="150" alt="" srcset="" />
            <h1 className="mb-2 text-2xl">Goloka IT</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </label>
          <select
            value={loginType}
            onChange={handleLoginTypeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          {selectedType && (
            <div className="mt-3">
              Login as <strong className="text-red-600">{selectedType}</strong>
            </div>
          )}
          <br />
          <form>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="email"
                name="email"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="id@email.com"
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="*********"
              />
            </div>
            <div className="flex items-center justify-center ">
              <div className="mb-5 text-lg">
                <Link to="/ForgotPassword">
                  <u>Forgot Password?</u>
                </Link>
              </div>
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-3xl bg-cyan-700 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-cyan-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
