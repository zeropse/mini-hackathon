import PropTypes from "prop-types";

const RetroButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 bg-gray-300 text-black border border-black text-xs hover:bg-gray-400 active:translate-y-[2px]"
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
  onClick: PropTypes.func.isRequired,
};

export default RetroButton;
