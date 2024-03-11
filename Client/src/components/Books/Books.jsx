import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api";

import { motion, useAnimation } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Books = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/books/getBooks"
          `${BASE_URL}/book`
          // "https://brajsundarproject.onrender.com/api/books/getBooks"
        );
        console.log(response.data);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getAllVideos();
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight / 2) {
        controls.start({ opacity: 1 });
      } else {
        controls.start({ opacity: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <motion.div
      className="text-gray-600 body-font"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <div className="container px-10 mx-auto ">
        <div className="flex flex-wrap w-full mb-16 justify-center">
          <div className="lg:w-1/2 w-full  lg:mb-0 text-center ">
            <motion.h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Books
            </motion.h1>
            <div className="h-1 w-full bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="slider-controls">
          <Slider {...sliderSettings}>
            {videoData.map((videos) => (
              <motion.div
                key={videos.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hover:scale-100 "
              >
                <a target="_blank" href={videos.bookLink}>
                  {" "}
                  <div
                    className="bg-white/5 p-5 rounded-lg cursor-pointer mx-5 my"
                    style={{ height: "400px" }}
                  >
                    <div className="">
                      <img
                        className="h-48 w-full object-cover object-center mb-6 rounded"
                        src={
                          "https://brajsundar.s3.ap-south-1.amazonaws.com/" +
                          videos?.bookThumbnail
                        }
                        // src="https://d2lnag86znkprh.cloudfront.net/Images/Book/65b8088ea6c92bf273b6312c/thumbnail_1.png"
                        alt={videos.bookName}
                      />
                    </div>
                    <div className="">
                      <h2 className="text-xl text-white  font-medium title-font ">
                        {videos.bookName}
                      </h2>
                    </div>
                    <p className="text-md text-white/70">
                      {videos.bookDetail.slice(0, 130)}{" "}
                      {/* Sliced bookDetail */}
                      {/* Add "..." or any other indicator to show that the text is truncated */}
                      {videos.bookDetail.length > 100 && "..."}
                      {/* <a href={videos?.bookLink}>View</a> */}
                    </p>{" "}
                  </div>
                </a>
              </motion.div>
            ))}
          </Slider>
          <div className="flex mx-auto my-5">
            {" "}
            <a
              href="/books"
              type="button"
              className="px-14 mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 
             focus:ring-4 focus:ring-purple-300 font-medium rounded  lg:px-9 px-4 lg:py-2.5 py-1 mb-2
              dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Books;
