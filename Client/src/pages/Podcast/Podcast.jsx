import React, { useState } from "react";
import { PodcastData } from "../../utils/Podcast.jsx";
import "./Podcast.css"
const Podcast = () => {
  const [displayedPodcasts, setDisplayedPodcasts] = useState(10);

  const handleLoadMore = () => {
    setDisplayedPodcasts((prevCount) => prevCount + 10);
  };

  return (
    <div className="my-10">
      <div>
        <h1 className="text-center text-4xl font-bold mb-7">Podcast</h1>
      </div>

      <div className="md:px-[20rem] px-10">
        {PodcastData.slice(0, displayedPodcasts).map((data, index) => (
          <span
            key={index}
            className="w-[10rem] mx-10 my-10 bg-transparent shadow-xl showdow-white"
          >
            {data}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        {displayedPodcasts < PodcastData.length && (
          <button
            type="button"
            className="px-14 mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 
          focus:ring-4 focus:ring-purple-300 font-medium rounded-lg py-2.5 mb-2 bg-purple-600 hover:bg-purple-700 
          focus:ring-purple-900"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Podcast;
