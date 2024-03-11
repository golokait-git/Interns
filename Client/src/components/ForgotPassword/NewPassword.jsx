import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function NewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Email } = location.state || {};
  console.log(Email);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlevalidations = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      handleSubmit();
    } else {
      alert("Passwords do not match");
      return false; // Return false if passwords don't match
    }
  };
  

  const handleSubmit = async () => {
    try {
      const data = { newpassword: newPassword, email: Email };
      // Send the new password to the server for updating in the database
      const response = await axios.put(
        `http://localhost:5000/auth/newpass/${Email}`,
        data
      );
      // console.log("Server Response:", response);

      if (response.data.status === true) {
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving new password.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src="./src/assets/goloka.png" width="150" alt="" srcset="" />
            <h1 className="mb-2 text-2xl">Goloka IT</h1>
            <span className="text-gray-300">Enter New Password</span>
          </div>
          <form onSubmit={handlevalidations}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="NewPassword"
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                required
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="NewPassword"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-3xl bg-cyan-700 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-cyan-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
