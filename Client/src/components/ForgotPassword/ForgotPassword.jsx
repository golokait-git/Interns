import axios from "axios";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  // const [OTP, setOTP] = useState('');
  const onChange = (value) => {
    setCaptchaValue(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please Fill the email input");
      return;
    }
    if (!captchaValue) {
      alert("Please Complete the Captcha Verification");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/auth/sendOTP", {
        email: email,
      });
      console.log("Server response:", response.data);

      if (response.data.Status === true) {
        console.log(response.data.otp);
        const OTP = response.data.otp;
        const Email = response.data.email;
        alert(`An OTP is sent to your phone number`);
        navigate("/VerifyOTP", { state: { OTP, Email } });
      }
    } catch (error) {
      console.error("Error while sending OTP:", error.message);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src="./src/assets/goloka.png" width="150" alt="" srcset="" />
            <h1 className="mb-2 text-2xl">Goloka IT</h1>
            <span className="text-gray-300">Enter Company Email</span>
          </div>

          <form>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="id@email.com"
                required
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-white">
              <ReCAPTCHA
                sitekey="6Le-IWIpAAAAAIdSdT59rDYCAybEYpjAFhl4wAax"
                onChange={onChange}
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

export default ForgotPassword;
