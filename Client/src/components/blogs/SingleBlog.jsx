import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const ref = useRef();

  useEffect(() => {
    // Fetch data for a single blog post using the id parameter
    // fetch(`http://localhost:5000/api/articles/getArticle/${id}`)
    fetch(
      `https://brajsundarproject.onrender.com/api/articles/getArticle/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.findArticle);
        setBlog(data.findArticle); // Set blog post to the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className="single-blog">
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="imageContainer" ref={ref}>
            <img className="" src={blog.thumbnail} alt={blog.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
