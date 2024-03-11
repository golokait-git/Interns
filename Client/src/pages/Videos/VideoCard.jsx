import React from "react";

const VideoCard = ({ videoName, video_url }) => {
  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^?&]+)/;
    const match = url.match(regex);
    return match && match[1];
  };

  return (
    <div className="md:w-[45rem]">
      <a href={video_url}>
        <div
          className="flex flex-col border rounded-lg px-10 border
       border-white/10 shadow md:flex-row max-w-4xl bg-transparent  
        cursor-pointer hover:bg-white/5 py-5 2xl:w-[70rem]"
        >
          <div className="max-w-xs 2xl:max-w-md  w-[50%]">
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                video_url
              )}`}
              alt="video"
              className="rounded-t-lg"
            />
          </div>

          <div className="flex w flex-col p-4 leading-normal max-w-5xl my-auto md:w-[70%] mx-auto">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white  text-center">
              {videoName}
            </h5>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-3xl">
                        Here are the biggest enterprise technology acquisitions of 2021 so
                        far, in reverse chronological order.
                    </p> */}
          </div>
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
