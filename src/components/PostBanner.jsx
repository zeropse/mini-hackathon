import { useState } from "react";
import PropTypes from "prop-types";

const PostBanner = ({ title, time, username, comments }) => {
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
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <p>Posted {time} ago by</p>
          <p className="cursor-pointer hover:underline w-fit">{username}</p>
          <p className="bg-gray-200 px-2 py-1 rounded">{comments} comments</p>
        </div>
      </div>
    </div>
  );
};

PostBanner.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default PostBanner;
