import React from "react";

const HomeCard = ({ data, link }) => {
  return (
    <a href={link}>
      <div
        className="text-2xl hover:text-white text-gray-350 border-gray-500 
      hover:border-white p-[3rem] lg:my-10  border bg-white/5 text-center shadow-2xl 
      transition-all duration-700 hover:scale-105 rounded-lg"
      >
        {data}
      </div>
    </a>
  );
};

export default HomeCard;
