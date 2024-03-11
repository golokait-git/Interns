import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCards from "../components/courseCards";
import { BASE_URL } from "../api";

const Academy = () => {
  const [courses, setCourses] = useState([]);
  const [coaching, setCoaching] = useState([]);
  const [workShop, setWorkShop] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          // "https://brajsundarproject.onrender.com/api/course/getCourse"
          `${BASE_URL}/course`
        );
        const coachingResponse = await axios.get(
          // "https://brajsundarproject.onrender.com/api/coaching/getCoaching"
          `${BASE_URL}/coaching`
        );
        const workshopResponse = await axios.get(
          // "https://brajsundarproject.onrender.com/api/workshop/getWorkshops"
          `${BASE_URL}/workshop`
        );

        setCourses(courseResponse.data.slice(0, 3));
        setCoaching(coachingResponse.data.slice(0, 3));
        setWorkShop(workshopResponse.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lg:mx-[10rem] mx-[2rem]">
      <div className="my-8 ">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl my-5">Live Courses </h1>
          <a
            type="button"
            href="/academy/courses"
            className="text-white text-2xl border-2 border-gray-600 border-white
            hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
             lg:px-10 lg:py-2.5 py-1 px-5 items-center text-center
              focus:outline-none bg-transparent hover:bg-white/10 w-100 "
          >
            Explore
          </a>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
          {courses.map((data, index) => (
            <CourseCards
              key={index}
              coursename={data.name}
              des={data.description}
              thumbnail={data.thumbnail}
            />
          ))}
        </div>
      </div>

      {/* Workshop Section */}
      <div className="my-14"></div>
      <div className="my-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl my-5">Workshop</h1>
          <a
            type="button"
            href="/academy/workshop"
            className="text-white text-2xl border-2 border-gray-600 border-white
             hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
              lg:px-10 lg:py-2.5 py-1 px-5 items-center text-center
               focus:outline-none bg-transparent hover:bg-white/10 w-100 "
          >
            Explore
          </a>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
          {workShop.map((data, index) => (
            <CourseCards key={index} coursename={data.name} des={data.description} />
          ))}
        </div>
      </div>

      {/* Coaching Section */}
      <div className="my-14"></div>
      <div className="my-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl my-5">Coaching</h1>
          <a
            type="button"
            href="/academy/workshop"
            className="text-white text-2xl border-2 border-gray-600 border-white
            hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
             lg:px-10 lg:py-2.5 py-1 px-5 items-center text-center
              focus:outline-none bg-transparent hover:bg-white/10 w-100 "
          >
            Explore
          </a>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
          {coaching.map((data, index) => (
            <CourseCards key={index} coursename={data.name} des={data.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;
