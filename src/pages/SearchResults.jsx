import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostBanner from "../components/PostBanner";

const SearchResults = ({ normalPosts }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setFilteredPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {query ? (
        <div>
          <h1>Search Results for &quot;{query}&quot;</h1>
          {filteredPosts.length > 0 ? (
            <div>
              {filteredPosts.map((post) => (
                <PostBanner
                  key={post.id}
                  title={post.title}
                  username={post.username}
                  to={`/post/${post.id}`}
                />
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      ) : (
        <div>
          <h1>All Posts</h1>
          {normalPosts.map((post) => (
            <PostBanner
              key={post.id}
              title={post.title}
              username={post.username}
              to={`/post/${post.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
