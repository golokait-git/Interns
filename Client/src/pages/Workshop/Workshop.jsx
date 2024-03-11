import React, { useEffect, useState } from "react";
import WorkshopCard from "./WorkshopCard";
// import RatingCard from "./RatingCard";
// import VideoDuration from "./VideoDuration";
// import PriceFilterCard from "./PriceFilterCard.jsx";
// import RateDropDown from "./RateDropDown.jsx";
import axios from "axios";
import { BASE_URL } from "../../api";

const Workshop = () => {
  const [workShop, setWorkShop] = useState([]);
  const [displayedWorkshop, setDisplayedWorkshop] = useState(2);

  useEffect(() => {
    const getAllWorkshopData = async () => {
      const response = await axios.get(
        // "http://localhost:5000/api/workshop/getWorkshops"
        `${BASE_URL}/workshop`
        // "https://brajsundarproject.onrender.com/api/workshop/getWorkshops"
      );
      console.log(response.data);
      setWorkShop(response.data);
    };

    getAllWorkshopData();
  }, []);

  const handleLoadMore = () => {
    setDisplayedWorkshop((prevCount) => prevCount + 2);
  };

  return (
    <div className="my-10">
      <div className="my-10">
        <h1 className="text-center text-4xl font-bold mb-7">Workshop</h1>
      </div>{" "}
      {/* <div className="mx-[7rem] flex gap-10 justify-between lg:flex-row flex-col"> */}
      <div>
        <div className="flex flex-col gap-4 items-center">
          {workShop.slice(0, displayedWorkshop).map((workshops) => (
            <WorkshopCard
              key={workshops._id}
              id={workshops._id}
              workshopName={workshops.name}
              workshopSlug={workshops.description}
              workshopThumbnail={workshops.thumbnail}
              exclyUrl={workshops.exclyUrl}
            />
          ))}
          {displayedWorkshop < workShop.length && (
            <button
              type="button"
              className="px-14 mb-[7rem] mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
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

export default Workshop;
