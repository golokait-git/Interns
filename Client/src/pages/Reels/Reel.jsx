import axios from "axios";
import React, { useEffect, useState } from "react";
import RateDropDown from "./RateDropDown";
import RatingCard from "../Videos/RatingCard";
import VideoDuration from "../Videos/VideoDuration";
import ReelCard from "./ReelCard";
import PriceFilterCard from "../Videos/PriceFilterCard";
import { BASE_URL } from "../../api";
const Reel = () => {
  const [reelData, setReelData] = useState([]);

  useEffect(() => {
    const getAllReels = async () => {
      try {
        const response = await axios.get(
          // "https://brajsundarproject.onrender.com/api/reels/getReels"
          `${BASE_URL}/reels`
        );
        console.log(response.data);
        setReelData(response.data);
      } catch (error) {
        console.log("Error Fetching Reels: ", error);
      }
    };

    getAllReels();
  }, []);

  return (
    <div className="my-10">
      <div>
        <h1 className="text-center text-4xl font-bold mb-7">Reels</h1>
      </div>{" "}
      <div
        className="lg:mx-[7rem] mx-[3rem] grid grid-cols-1 sm:grid-cols-2 
      lg:grid-cols-2 xl:grid-cols-2 gap-12 2xl:grid-cols-3 "
      >
        {reelData.map((reel) => (
          <ReelCard
            key={reel.id}
            reelName={reel.reelName}
            url={reel.reelUrl}
            reelThumbnail={reel.reelThumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default Reel;
