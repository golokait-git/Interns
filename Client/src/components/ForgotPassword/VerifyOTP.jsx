import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';


function VerifyOTP() {
   const location = useLocation();
   const navigate = useNavigate();
   const { OTP } = location.state || {};
   const {Email} = location.state || {};


  const [userInputOTP, setUserInputOTP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (userInputOTP === OTP) {
      // OTPs match, handle success
      alert('OTP Matched!');
      navigate("/NewPassword",{state:{Email}}) // You can perform further actions here
    } else {
      // OTPs don't match, handle error
      alert('OTP Mismatch!');
    }
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">

          <div className="mb-8 flex flex-col items-center">
            <img src="./src/assets/goloka.png" width="150" alt="" srcset="" />
            <h1 className="mb-2 text-2xl">Goloka IT</h1>
            <span className="text-gray-300">Enter OTP</span>
          </div>
          <form>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="otp"
                autoComplete="off"
                 value={userInputOTP}
                onChange={(e) => setUserInputOTP(e.target.value)}
                placeholder="Enter OTP"
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
  )
}

export default VerifyOTP;