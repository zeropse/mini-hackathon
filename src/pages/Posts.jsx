import { useEffect, useState } from "react";
import PostBanner from "../components/PostBanner";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostBanner
            key={post.id}
            title={post.title}
            username={post.username}
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default Posts;
