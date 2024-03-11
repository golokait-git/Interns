import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Videos = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);

  // useEffect(() => {
  //   const getVideos = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/youtube/videos"
  //       );
  //       setVideoData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching videos:", error);
  //     }
  //   };

  //   getVideos();
  // }, []);

  // const getYoutubeVideoId = (url) => {
  //   const regex = /[?&]v=([^?&]+)/;
  //   const match = url.match(regex);
  //   return match && match[1];
  // };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio my-10" ref={ref} style={{ width: "100%" }}>
      <div className="flex  flex-wrap w-full lg:mb-12 justify-center">
        <motion.h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
          Worldwide Bhagwat Yatra
        </motion.h1>
        <div className="h-1 w-full bg-indigo-500 rounded"></div>
      </div>
      <div className="flex items-center justify-center my-10 ">
        <div className="rounded-lg overflow-hidden w-full  h-full -py-2">
          <Carousel
            autoPlay={true}
            dynamicHeight={false}
            interval={2500}
            showIndicators={true}
            infiniteLoop={true}
            showArrows={false}
            showStatus={false}
            swipeable={true}
            showThumbs={false} // Add this line to hide the thumbs
            className="h-full overflow-visible"
            style={{ overflow: "visible" }}
          >
            <div>
              <img
                // src="https://www.megamaxaviation.com/wp-content/uploads/2023/01/Pilgrimage-to-Char-dham-yatra-1568x824.jpg"
                src="/yatra/1.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/2.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/3.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/4.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/5.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/6.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/7.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/8.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/9.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
            <div>
              <img
                src="/yatra/10.jpg"
                style={{ width: "80%", height: "150%" }}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Videos;
