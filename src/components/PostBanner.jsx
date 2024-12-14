import PropTypes from "prop-types";

const PostBanner = ({ title, username }) => {
  return (
    <div className="post-banner p-2 flex items-center gap-1">
      <div className="post-banner-content flex-1">
        <h1 className="text-blue-800 cursor-pointer hover:underline w-fit">
          {title}
        </h1>
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
};

export default PostBanner;
