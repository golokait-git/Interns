import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
// const BASE_URL = process.env.BASE_URL;
import { BASE_URL } from "../../api";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(
          // "https://brajsundarproject.onrender.com/api/articles/getArticles"
          `${BASE_URL}/article`
        );
        console.log(response.data);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="my-10">
      <h1 className="mx-auto text-3xl items-center font-bold text-center">
        Blogs
      </h1>
      <div
        className="my-[2rem] grid h-full lg:grid-cols-3 mdl1:grid-cols-2 sm:grid-cols-1 2xl:grid-cols-4 mx-auto 
      items-center justify-center "
      >
        {blogData.map((data, index) => (
          <div key={index}>
            <BlogCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
