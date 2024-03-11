import React, { useEffect, useState } from "react";
import { motion, useAnimation, useResetProjection } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./blogs.scss";
import { BASE_URL } from "../../../api";
import axios from "axios";

const Blogs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          margin: "10px 0px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/articles/getArticles"
          `${BASE_URL}/article`
          // "https://brajsundarproject.onrender.com/api/articles/getArticles"
        );
        // const data = await response.json();
        // console.log("===>", response.data);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

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

  var sliderSettings = {
    // dots: true,
    // dotsClass: "custom-dots", // Add a custom class for the dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 780,
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
            {/* <div className="flex "> */}{" "}
            <motion.h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Explore My Blogs
            </motion.h1>
            {/* <button
                type="button"
                className=" mx-auto text-sm focus:outline-none text-white bg-purple-700 hover:bg-purple-800  focus:ring-4 focus:ring-purple-300  rounded-lg  px-3 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Enroll Now
              </button> */}
            {/* </div> */}
            <div className="h-1 w-full bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="slider-controls">
          <SamplePrevArrow className="prev-arrow" />
          <Slider {...sliderSettings}>
            {items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hover:scale-100"
              >
                <a href={`/blog/${item._id}`}>
                  {" "}
                  <div
                    className="bg-white/5 p-5 rounded-lg cursor-pointer mx-5 "
                    style={{ height: "400px" }}
                  >
                    <div className="">
                      <img
                        className="h-48 w-full object-cover object-center mb-6 rounded"
                        src={
                          "https://brajsundar.s3.ap-south-1.amazonaws.com/" +
                          item.thumbnail
                        }
                        // src="https://d2lnag86znkprh.cloudfront.net/Images/Article/65b2bdc85d779ca088e99748/thumbnail_5.png"
                        alt={item.title}
                      />
                    </div>
                    <div className="">
                      <h2
                        className="2xl:text-2xl text-xl text-white font-bold font-medium
                       title-font mb-4"
                      >
                        {item.title}
                      </h2>
                      <p className="md:text-md text-white text-sm">
                        {item.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </Slider>
          <SampleNextArrow className="next-arrow " />
          <div className="flex mx-auto my-2">
            {" "}
            <a
              href="/blogs"
              type="button"
              className="px-14 mx-auto text-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 
             focus:ring-4 focus:ring-purple-300 font-medium rounded  lg:px-9 px-4 lg:py-2.5 py-1 my-1
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

export default Blogs;
