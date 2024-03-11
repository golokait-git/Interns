import { useScroll } from "framer-motion";
import React, { useState } from "react";
import { FaAmazon } from "react-icons/fa";
import "./AdPurchase.css";

import { IMG } from "../../api";
const VideoCard = ({ bookName, thumbnail, bookLink, bookDetail }) => {
  console.log(bookName, thumbnail, bookLink, bookDetail);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [amazonLink, setAmazonLink] = useState("");

  const [view, setView] = useState(false);
  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^?&]+)/;
    const match = url.match(regex);
    return match && match[1];
  };
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setView(true);
    const selectedLink = bookLink.find(
      (link) => link.country === event.target.value
    );
    if (selectedLink) {
      setAmazonLink(selectedLink.link);
    } else {
      setAmazonLink(""); // Clear the link if the selected country doesn't have a link
    }
  };

  const handleButtonClick = () => {
    console.log(amazonLink);
    if (amazonLink) {
      window.open(amazonLink, "_blank");
    }
  };

  const trimmedBookDetail = bookDetail.slice(0, 200); // Adjust the number of characters as needed

  return (
    <div className=" bg-gray-800/30   md:px-10 mx-4 my-4 md:w-[45rem] 2xl:w-[65rem]">
      {/* <a href={bookLink} target="_blank"> */}{" "}
      <div
        className="flex flex-col 
        rounded-lg shadow md:flex-row max-w-3xl 2xl:max-w-5xl bg-transparent border-none cursor-pointer  py-5"
      >
        <div className=" mx-auto px-3 my-auto md:max-w-[50%] 2xl:py-2">
          {/* <iframe 
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(video_url)}`} 
                    alt="video" 
                    className='rounded-t-lg' /> */}
          {/* <img src={thumbnail} alt="" className="w-[20rem]" /> */}
          <img
            // src="https://d2lnag86znkprh.cloudfront.net/Images/Book/65b8088ea6c92bf273b6312c/thumbnail_1.png"
            src={IMG + thumbnail}
            alt="book_name"
            className="w-[18rem] h-full"
          />
        </div>

        <div
          className="flex w flex-col p-4 leading-normal max-w-5xl md:max-w-[65%] 
        text-center md:text-left my-auto px-10"
        >
          <div>
            {" "}
            <h5
              className="mb-2 text-2xl font-bold
             tracking-tight text-gray-200  2xl:text-3xl"
            >
              {bookName}
            </h5>
            {/* <p className="mb-3 font-normal text-gray-200 w-3xl">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p> */}
            <p className="mb-3 font-normal text-gray-200  2xl:text-xl text-wrap overflow-scroll h-20 scrollbar-hide">
              {trimmedBookDetail}
            </p>
          </div>
          <div className="relative z-0 w-full group md:w-full ">
            <div className="relative z-0 w-full group w-[50%] my-3">
              <select
                id="countries"
                className="border border-white/30 text-gray-900 text-md rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400  text-white/70 bg-gray-900 w-[50%] 
                md:w-[100%] mx-auto md:mx-0 2xl:p-4 2xl:text-xl text-center"
                onChange={handleCountryChange}
                value={selectedCountry}
              >
                <option value="">Select Country</option>
                {bookLink.map((link, index) => (
                  <option key={index} value={link.country}>
                    {link.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-auto items-center justify-center my-3 my-auto">
              {view && (
                <button
                  className="text-white focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-14
                   py-2.5 text-center border hover:bg-white/10 2xl:py-4 2xl:text-xl my-auto flex mx-auto"
                  onClick={handleButtonClick}
                >
                  Purchase
                  <span>
                    <img
                      src="/amazon2.png"
                      alt="amazon"
                      className="w-16 pl-2 pt-2"
                    />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
};

export default VideoCard;
