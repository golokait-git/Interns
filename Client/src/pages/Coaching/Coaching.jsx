import React, { useState, useEffect } from "react";
import CoachingCard from "./CoachingCard";
// import RatingCard from "./RatingCard";
// import VideoDuration from "./VideoDuration";
// import PriceFilterCard from "./PriceFilterCard.jsx";
// import RateDropDown from "./RateDropDown.jsx";
import axios from "axios";
import { BASE_URL } from "../../api";

const Coaching = () => {
  const [coaching, setCoaching] = useState([]);
  const [displayedCoaching, setDisplayedCoaching] = useState(2);

  useEffect(() => {
    const getAllCourseData = async () => {
      const response = await axios.get(
        // "http://localhost:5000/api/coaching/getCoaching"
        `${BASE_URL}/coaching`

        // "https://brajsundarproject.onrender.com/api/coaching/getCoaching"
      );
      console.log(response.data);
      setCoaching(response.data);
    };
    getAllCourseData();
  }, []);
  const handleLoadMore = () => {
    setDisplayedCoaching((prevCount) => prevCount + 2);
  };
  return (
    <div className=" my-10">
      <div>
        <h1 className="text-center text-4xl font-bold mb-7">Coaching</h1>
      </div>{" "}
      <div>
        <div className="flex flex-col gap-4 items-center">
          {coaching.slice(0, displayedCoaching).map((coaching) => (
            <CoachingCard
              key={coaching._id}
              id={coaching._id}
              CoachingName={coaching.name}
              CoachingSlug={coaching.description}
              coachingThumbnail={coaching.thumbnail}
              exclyUrl={coaching.exclyUrl}
            />
          ))}
          {displayedCoaching < coaching.length && (
            <button
              type="button"
              className="px-14 mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg py-2.5 mb-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
              onClick={handleLoadMore}
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coaching;
