import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { BASE_URL } from "../../api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState(2);
  const baseUrl =
    // process.env.BASE_URL || "https://brajsundarproject.onrender.com/api";

    useEffect(() => {
      const getAllCourseData = async () => {
        try {
          const response = await axios.get(
            // `${BASE_URL}/course/getCourse`
            `${BASE_URL}/course`
            // "https://brajsundarproject.onrender.com/api/course/getCourse"
          );

          console.log("=====>", response.data);
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      getAllCourseData();
    }, []);

  const handleLoadMore = () => {
    setDisplayedCourses((prevCount) => prevCount + 2);
  };

  return (
    <div className=" my-10">
      <div>
        <h1 className="text-center text-4xl font-bold mb-7">Live Courses</h1>
      </div>

      <div className="flex flex-col gap-4 w-full mx-auto items-center justify-center">
        {courses.slice(0, displayedCourses).map((course) => (
          <CourseCard
            key={course._id}
            id={course._id}
            courseName={course.name}
            courseSlug={course.description}
            courseThumbnail={course.thumbnail}
            exclyUrl={course.exclyUrl}
          />
        ))}
        {displayedCourses < courses.length && (
          <button
            type="button"
            className="px-14 mb-[7rem] mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg py-2.5 mb-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
            onClick={handleLoadMore}
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default Courses;
