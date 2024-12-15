import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PostDetails = () => {
  const { username, id } = useParams(); // Get both username and id from the URL
  const [post, setPost] = useState(null); // State to hold post data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors

  useEffect(() => {
    // Fetch the post data when the component is mounted or `username` or `id` changes
    fetch(`/api/posts/${username}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data); // Update the state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError(err.message); // Set error message if any error occurs
        setLoading(false);
      });
  }, [username, id]);

  // Loading, error, and data display logic
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Return post details if data is loaded
  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.username}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetails;
