import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostBanner = ({ title, username, to }) => {
  return (
    <div className="post-banner p-2 flex items-center gap-1">
      <div className="post-banner-content flex-1">
        <Link
          to={to}
          className="text-blue-800 cursor-pointer hover:underline w-fit"
        >
          {title}
        </Link>
        <p className="cursor-pointer text-xs text-gray-500">
          posted by {username}
        </p>
      </div>
    </div>
  );
};

PostBanner.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default PostBanner;
