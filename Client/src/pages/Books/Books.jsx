import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import VideoDuration from "./VideoDuration";
import PriceFilterCard from "./PriceFilterCard.jsx";
import RateDropDown from "./RateDropDown.jsx";
import VideoCard from "./VideoCard";
import axios from "axios";
import BulkPurchase_Form from "./BulkPurchase_Form.jsx";
import AdPurchase from "./AdPurchase";
import { BASE_URL } from "../../api";

const Books = () => {
  const [videoData, setVideoData] = useState([]);
  const dummyBook = [
    // {
    //   books: 1,
    //   name: "Sri Narayan Kavaca",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    //   bookThumbnail: "/2.jpg",

    //   price: 100,
    // },
    {
      books: 2,
      name: "Entangled Hearts",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      bookThumbnail: "/1.png",

      price: 100,
    },
  ];

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

  return (
    <div className="">
      <div>
        <h1 className="text-center text-4xl font-bold mb-7 my-10">Books</h1>
      </div>{" "}
      {/* <div className="mx-[7rem] flex gap-10 justify-between lg:flex-row flex-col"> */}
      <div>
        {/* <div className="lg:block hidden">
          <div className="w-full my-5 mb-10">
            <RateDropDown />
          </div>
          <div className="w-full my-10">
            <h1 className="font-bold">Ratings</h1> <RatingCard />
          </div>

          <div className="w-full my-10">
            <h1 className="font-bold">Video Duration</h1> <VideoDuration />
          </div>
          <div className="w-full my-10">
            <h1 className="font-bold">Video Duration</h1> <PriceFilterCard />
          </div>
        </div> */}
        <div className="flex flex-col gap-4 items-center">
          {videoData.map((videos, index) => {
            console.log(videos); // Log the 'videos' variable
            return (
              <VideoCard
                key={index}
                bookName={videos.bookName}
                thumbnail={videos.bookThumbnail}
                bookLink={videos.bookLink}
                bookDetail={videos.bookDetail}
              />
            );
          })}
        </div>
      </div>
      <hr className="bg-white opacity-70  mx-10 my-10" />
      <div className="flex flex-col gap-4 items-center ">
        <div>
          {" "}
          <h1 className="text-center text-4xl font-bold mb-7 my-10">
            Booking In Advance
          </h1>
        </div>
        {dummyBook.map((data, index) => (
          <div className=" bg-gray-800/30   px-2 mx-4 my-4" key={index}>
            <div
              className="flex flex-col 
            rounded-lg shadow md:flex-row max-w-3xl bg-transparent border-none cursor-pointer  py-5 2xl:max-w-5xl"
            >
              <div className=" mx-auto px-5 my-auto md:max-w-[50%]">
                <img src={data.bookThumbnail} alt="" className="w-[20rem]" />
              </div>

              <div className="flex w flex-col p-4 leading-normal max-w-5xl md:max-w-[70%] text-center md:text-left my-auto">
                <h5
                  className="mb-2 text-2xl font-bold
                 tracking-tight text-gray-200 max-w-5xl 2xl:text-3xl"
                >
                  {data.name}
                </h5>

                <p className="mb-3 font-normal text-gray-200 w-3xl 2xl:text-xl">
                  {data.description}
                </p>
                <div
                  className="relative z-0 w-full mb-5 group my-2
               grid md:grid-cols-2 grid-cols-1 gap-10"
                >
                  <div className="mx-auto  justify-center">
                    <AdPurchase />
                  </div>
                </div>
              </div>
            </div>
            {/* </a> */}
          </div>
          // <h1>hello world</h1>
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center"></div>
      <div className="my-10"></div>
      <hr className="bg-white opacity-70  mx-10 my-10" />
      <div className="my-10 items-center ">
        <h1 className="text-center text-4xl  font-bold mb-7 my-20">
          Want to purchase books in bulk ?
        </h1>
        <p className="font-semibold text-center mx-10 items-center text-lg ">
          Fill this from if you want to order any book in bulk.
        </p>
        <p className="font-semibold text-center  items-center text-lg ">
          We will get in touch with you soon.{" "}
        </p>
        <div className="my-10"></div>
        <BulkPurchase_Form />
      </div>
    </div>
  );
};

export default Books;
