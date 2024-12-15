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
    return <p className="text-center text-xl text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  // Return post details if data is loaded
  return (
    <div className="flex items-center justify-center my-4">
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="border-b-2 pb-4 mb-4">
          <h1 className="text-4xl font-semibold text-gray-800">{post.title}</h1>
          <p className="text-lg text-gray-500 mt-2">
            Posted by{" "}
            <span className="font-bold text-blue-500">@{post.username}</span>
          </p>
        </div>

        <div className="text-gray-700">
          <p>{post.content}</p>
        </div>

        <div className="mt-6 border-t-2 pt-4 text-sm text-gray-500 text-center">
          <p className="italic">Part of codedex.io&apos;s holiday hackathon</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
