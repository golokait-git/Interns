import React, { useState, useEffect } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { CgEditBlackPoint } from "react-icons/cg";
import { TbPointFilled } from "react-icons/tb";
import { useParams } from "react-router-dom";

import axios from "axios";

const CourseViewPage = () => {
  const [course, setCourse] = useState("");

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getSinglecourse = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/course/getCourse/${id}`
          `https://brajsundarproject.onrender.com/api/course/getCourse/${id}`
        );
        console.log(response.data.data);
        setCourse(response.data.data);
      } catch (error) {
        console.log("Error Fetching the given course");
      }
    };
    getSinglecourse();
  }, [id]);
  // console.log(course);
  const CourseObjectives = course.CourseObjectives;
  const courseHighlights = course.CourseHighlights;
  const Assessment = course.Assessment;
  console.log(CourseObjectives);
  return (
    <div className="mx-[10rem] my-[1rem]">
      <div className="border-2 border-white/40 p-10 rounded-lg bg-white/5 flex justify-between cursor-pointer ">
        <div className="max-w-[60%] items-center py-10">
          {" "}
          <h1 className="text-3xl font-bold">{course.CourseName}</h1>
          <p className="text-xl font-medium py-5">{course.CourseSlug}</p>
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow6500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md my-2 rounded-2xl text-black px-5 py-1 dark:focus:ring-yellow-900"
          >
            Certified Course
          </button>
        </div>
        <div className="max-w-[30%]  border-2 flex items-center  border-gray-600 w-[18rem] h-[15rem] mx-10  z-10 rounded-lg flex-col">
          <div className="flex flex-col text-center items-center py-10">
            {" "}
            <p className="text-2xl font-medium ">Price: </p>
            <h1 className="text-3xl font-bold">₹ {course.CoursePrice}/-</h1>
          </div>
          <button
            type="button"
            className="px-14 mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800  focus:ring-4 focus:ring-purple-300 font-medium rounded-lg  px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Enroll Now
          </button>
        </div>
      </div>
      <div className="m-[4rem]"></div>
      <div>
        {" "}
        <div className="p-2 border-2 rounded-xl border-gray-600 w-1/4 text-center bg-white/10">
          {" "}
          <h1 className="font-bold text-2xl">Course Overview</h1>{" "}
        </div>
        <div>
          {" "}
          <div className="py-10 mt-4">
            {" "}
            <h1 className="font-bold text-2xl">Course Description:</h1>{" "}
          </div>
          <div className="text-lg flex flex-col gap-6 px-4">
            <p>{course.CourseDescription}</p>
            {/* <p className="italic font-bold">
              How does conflict resolution play a crucial role in maintaining a
              harmonious and thriving marriage? In what ways does intimacy
              contribute to the strength of a marriage, and what strategies can
              couples employ to enhance and maintain intimacy over time?
            </p>
            <p>
              {" "}
              How does understanding and addressing individual needs contribute
              to a healthier and more fulfilling marital relationship? How can
              couples strike a balance between maintaining independence and
              fostering interdependence in their relationship? What role do
              trust and forgiveness play in building and maintaining a strong
              foundation for a successful marriage?
            </p> */}
          </div>
        </div>
        <div>
          {" "}
          <div className="py-10 mt-4">
            {" "}
            <h1 className="font-bold text-2xl">Course Objectives:</h1>{" "}
          </div>
          <div className="text-lg flex flex-col gap-6 px-5 border-2 bg-white/10 mx-4 py-8 rounded-xl w-3/4">
            {CourseObjectives?.map((data, index) => (
              <p className="flex items-center gap-2" key={index}>
                <IoIosArrowDroprightCircle className="text-2xl" />
                {data}
              </p>
            ))}
          </div>
        </div>
        <div>
          {" "}
          <div className="py-10 mt-4">
            {" "}
            <h1 className="font-bold text-2xl">Key Highlights:</h1>{" "}
          </div>
          <div className="text-lg grid lg:grid-cols-2 sm:grid-cols-1 gap-6 px-5 border-2 bg-white/10 mx-4 py-8 rounded-xl w-3/4">
            {courseHighlights?.map((data, index) => (
              <p className="flex items-center gap-2 " key={index}>
                <CgEditBlackPoint className="text-2xl" />
                {data}
              </p>
            ))}

            {/* <div className="flex ">
              <p className="flex items-center gap-2">
                <CgEditBlackPoint className="text-2xl" /> Gain valuable insights
                to strengthen your marriage
              </p>
            </div> */}
            {/* <div className="flex items-center gap-10">
              <p className="flex items-center gap-2">
                <CgEditBlackPoint className="text-2xl" /> Develop conflict
                resolution skills
              </p>
              <p className="flex items-center gap-2">
                <CgEditBlackPoint className="text-2xl" />
                Build trust and intimacy in your relationship
              </p>
            </div> */}
          </div>
        </div>
        <div>
          {" "}
          <div className="py-10 mt-4">
            {" "}
            <h1 className="font-bold text-2xl">Course Outline:</h1>{" "}
          </div>
          <div className="text-xl flex px-7 flex-col">
            <div className="flex flex-col pb-5">
              <p className="flex items-center gap-2 ">
                <span className="font-bold"> Session 1:</span> The Foundations
                of a Strong Marriage
              </p>
              <ul className="py-2">
                <li className="flex gap-2">
                  <TbPointFilled />
                  What are the essential ingredients for a successful marriage?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples communicate effectively?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples resolve conflict?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples build intimacy?
                </li>
              </ul>
            </div>
            <div className="flex flex-col pb-5">
              <p className="flex items-center gap-2 ">
                <span className="font-bold"> Session 2:</span> The Challenges of
                Marriage
              </p>
              <ul className="py-2">
                <li className="flex gap-2">
                  <TbPointFilled />
                  What are some of the challenges that couples face?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples communicate effectively?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples resolve conflict?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples build intimacy?
                </li>
              </ul>
            </div>
            <div className="flex flex-col pb-5">
              <p className="flex items-center gap-2 ">
                <span className="font-bold"> Session 3:</span> The Challenges of
                Marriage
              </p>
              <ul className="py-2">
                <li className="flex gap-2">
                  <TbPointFilled />
                  What are some of the challenges that couples face?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples communicate effectively?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples resolve conflict?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples build intimacy?
                </li>
              </ul>
            </div>
            <div className="flex flex-col pb-5">
              <p className="flex items-center gap-2 ">
                <span className="font-bold"> Session 4:</span> The Challenges of
                Marriage
              </p>
              <ul className="py-2">
                <li className="flex gap-2">
                  <TbPointFilled />
                  What are some of the challenges that couples face?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples communicate effectively?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples resolve conflict?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples build intimacy?
                </li>
              </ul>
            </div>
            {/* <div className="flex items-center gap-10">
              <p className="flex items-center gap-2">
                <CgEditBlackPoint className="text-2xl" /> Develop conflict
                resolution skills
              </p>
              <p className="flex items-center gap-2">
                <CgEditBlackPoint className="text-2xl" />
                Build trust and intimacy in your relationship
              </p>
            </div> */}
          </div>
          <div>
            {" "}
            <div className="flex flex-col pb-5">
              <div className="py-5 mt-4">
                {" "}
                <h1 className="font-bold text-2xl">Course Outline:</h1>{" "}
              </div>
              <ul className="py-2 text-xl px-5">
                <li className="flex gap-2">
                  <TbPointFilled />
                  What are some of the challenges that couples face?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples communicate effectively?
                </li>
                <li className="flex gap-2">
                  <TbPointFilled />
                  How can couples resolve conflict?
                </li>
              </ul>
            </div>
            <div className="flex flex-col pb-5">
              <div className="py-5 mt-4">
                {" "}
                <h1 className="font-bold text-2xl">Assessment:</h1>{" "}
              </div>
              <ul className="py-2 text-xl px-5">
                {Assessment?.map((data, index) => (
                  <li className="flex gap-2">
                    <TbPointFilled />
                    {data}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
