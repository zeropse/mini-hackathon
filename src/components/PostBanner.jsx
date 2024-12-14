import { useState } from "react";
import PropTypes from "prop-types";

const PostBanner = ({ title, username }) => {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => setVotes((prevVotes) => prevVotes + 1);
  const handleDownvote = () => setVotes((prevVotes) => prevVotes - 1);

  return (
    <div className="post-banner p-2 flex items-center gap-4">
      <div className="vote-controls flex flex-col items-center text-gray-500 h-full">
        <button
          className="hover:text-gray-700"
          onClick={handleUpvote}
          aria-label="Upvote"
          style={{ fontSize: "1rem", lineHeight: "1rem" }}
        >
          ▲
        </button>
        <p className="text-sm font-medium">{votes}</p>
        <button
          className="hover:text-gray-700"
          onClick={handleDownvote}
          aria-label="Downvote"
          style={{ fontSize: "1rem", lineHeight: "1rem" }}
        >
          ▼
        </button>
      </div>

      <div className="post-banner-content flex-1">
        <h1 className="text-blue-800 cursor-pointer hover:underline w-fit">
          {title}
        </h1>
        <p className="cursor-pointer hover:underline text-xs text-gray-500">
          Posted by {username}
        </p>
      </div>
    </div>
  );
};

PostBanner.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PostBanner;
