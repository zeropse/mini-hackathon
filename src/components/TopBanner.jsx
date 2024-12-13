const TopBanner = () => {
  return (
    <div className="flex flex-row justify-end text-xs gap-x-2">
      <div className="flex flex-row">
        <p className="text-gray-500">want to join?</p>
        <p className="text-[#336699] mx-1 hover:underline hover:cursor-pointer">
          register
        </p>
        <p className="text-gray-500">in seconds</p>
      </div>

      <div className="flex justify-end text-[#336699]">
        <ul className="flex items-center gap-1">
          <li className="hover:underline cursor-pointer">submit</li>
          <span className="text-gray-500">|</span>
          <li className="hover:underline cursor-pointer">help</li>
          <span className="text-gray-500">|</span>
          <li className="hover:underline cursor-pointer">blog</li>
          <span className="text-gray-500">|</span>
        </ul>
      </div>
    </div>
  );
};

export default TopBanner;
