import PropTypes from "prop-types";

const RetroButton = ({ label, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 bg-gray-300 text-black border border-black text-xs hover:bg-gray-400 active:translate-y-[2px] ${className}`}
      style={{
        fontFamily: "'Verdana', sans-serif",
      }}
    >
      {label || "Click Me"}
    </button>
  );
};

RetroButton.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default RetroButton;
