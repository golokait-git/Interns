import React from "react";

const CoachingCard = ({
  id,
  CoachingSlug,
  CoachingName,
  coachingThumbnail,
  exclyUrl,
}) => {
  return (
    <div
      className="border  border-white/10 rounded shadow-2xl  
    mx-10 lg:mx-2 lg:p-4 hover:bg-white/5 lg:w-[50rem] md:w-[40rem] w-[90%] 2xl:w-[50rem]"
      // style={{ width: "50rem" }}
    >
      {" "}
      <div
        className="flex flex-col border rounded-lg
       shadow md:flex-row  bg-transparent border-none
        cursor-pointer   py-5 px-5"
      >
        <div className="max-w-xs items-center flex  2xl:w-full mx-auto  w-[50%]">
          <img
            className="rounded-t-lg w-full"
            // src="https://d2lnag86znkprh.cloudfront.net/Images/Workshop/65c32f8bc1fd65511b84cc87/thumbnail_1.png"
            src={
              "https://brajsundar.s3.ap-south-1.amazonaws.com/" +
              coachingThumbnail
            }
            alt=""
          />
        </div>
        <div
          className="flex w flex-col p-4 leading-normal max-w-5xl
          2xl:w-full 2xl:ml-10 md:w-[90%] mx-auto"
        >
          {" "}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white max-w-5xl text-center md:text-left">
            {/* Adjusted width using max-w-3xl */}
            {CoachingName}
          </h5>
          <p className="mb-3 font-normal text-gray-200 w-3xl">{CoachingSlug}</p>
          <div>
            <a
              href={exclyUrl}
              target="_blank"
              type="button"
              className="px-14 mx-auto text-lg focus:outline-none text-white
               bg-purple-700 hover:bg-purple-800  focus:ring-4 focus:ring-purple-300
                font-medium rounded-lg  px-4 py-2 mb-2 bg-purple-600 
                hover:bg-purple-700 focus:ring-purple-900 "
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingCard;
