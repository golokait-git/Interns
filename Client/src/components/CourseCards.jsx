import React from "react";

const CourseCards = ({ coursename, des }) => {
  // Check if description is provided and long enough to be sliced
  const description =
    des && des.length >= 3 ? des.slice(-80, -1) : "Description not available";

  return (
    <div className="my-2 mx-auto md:mx-2">
      <div
        className="max-w-sm  border border-gray-200 rounded-lg  
       shadow bg-gray-800 border-gray-700"
        style={{ height: "420px" }}
      >
        <a href="#">
          <img
            className="rounded-t-lg"
            src="https://dme2wmiz2suov.cloudfront.net/User(90154388)/CourseBundles(35078)/2336576-MA_1.png"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5
              className="mb-2 text-2xl font-bold tracking-tight 
            text-white"
            >
              {coursename}
            </h5>
          </a>
          <p className="mb-3 font-normal  text-gray-200">{des}</p>
          <a
            href="#"
            className="inline-flex items-center px-3  py-2 text-sm font-medium 
            text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800
             focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 
             hover:bg-blue-700 focus:ring-blue-800 flex absolute  "
          >
            Enroll Now
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCards;
