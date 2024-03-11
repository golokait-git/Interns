import React from "react";

export default function BlogCard({ data }) {
  console.log(data);

  // Function to truncate description to 50 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncatedWords = words.slice(0, 20);
    return truncatedWords.join(" ") + "...";
  };

  return (
    <div className="mx-auto h-full cursor-pointer flex justify-center">
      <div className="max-w-sm my-4 rounded-lg shadow bg-gray-800/30 h-[26rem] md:mx-2 w-[32rem]">
        <div className="p-3 object-cover mx-auto">
          <a href="#" className="h-12">
            <img
              className="rounded-t-lg object-cover h-[10rem] mx-auto w-full"
              src={
                "https://brajsundar.s3.ap-south-1.amazonaws.com/" +
                data.thumbnail
              }
              alt="blogthumbnail"
            />
          </a>
        </div>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
              {data.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-200 ">
            {truncateDescription(data.description)}
          </p>
          <a
            href={`/article/${data.id}`}
            className=" float-end inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
