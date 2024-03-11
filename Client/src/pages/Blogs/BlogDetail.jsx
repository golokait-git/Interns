import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api";

const BlogDetail = () => {
  const { id } = useParams();
  const [singleBlogData, setSingleBlogData] = useState({});

  useEffect(() => {
    const getSingleBlogData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/articles/getArticle/${id}`
          `${BASE_URL}/article/${id}`
        );
        console.log(response.data)
        const blog = response.data;
        console.log(blog);
        setSingleBlogData(blog);
        console.log(singleBlogData)
      } catch (error) {
        console.log("Error Fetching Blog Data: ", error);
      }
    };

    getSingleBlogData();
  }, []);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="max-w-3xl mx-auto rounded-md shadow-md overflow-hidden">
            {/* Blog Image */}
            <div className="flex gap-2 my-10">
              {" "}
              <div>
                <img
                  src={
                    "https://brajsundar.s3.ap-south-1.amazonaws.com/" +
                    singleBlogData.thumbnail
                  }
                  alt={singleBlogData.title}
                  className="w-full h-[20rem] object-contain object-center"
                />
              </div>
              {/* Blog Details */}
              <div className="p-6 my-auto">
                {/* Blog Title */}
                <h1 className="text-3xl font-semibold mb-4">
                  {singleBlogData.title}
                </h1>

                {/* Published Date */}
                {/* <p className="text-gray-500 mb-4">
                  Published on: {formatDate(singleBlogData.createdAt)}
                </p> */}

                {/* Blog Content */}
              </div>
            </div>
            <div className="prose max-w-full">
              {/* Replace the content below with your actual blog content */}
              <p>{singleBlogData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
