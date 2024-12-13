import logo from "../assets/reddit.com.header.png";
import RetroButton from "./RetroButton";

const Header = () => {
  return (
    <div className="flex flex-row items-end gap-1">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="bg-[#c6def7] flex flex-row gap-2 w-full text-sm h-5 items-end self-end">
        <span className="bg-[#336699] text-white hover:cursor-pointer relative px-2">
          hot
        </span>
        <span className="hover:cursor-pointer hover:bg-[#336699] hover:text-white transition-colors">
          news
        </span>
        <span className="hover:cursor-pointer hover:bg-[#336699] hover:text-white transition-colors">
          browse
        </span>
        <span className="hover:cursor-pointer hover:bg-[#336699] hover:text-white transition-colors">
          stats
        </span>
      </div>
      <div className="flex flex-row items-center ml-auto gap-1">
        <input
          type="text"
          placeholder="Search"
          className="border border-black"
        />
        <RetroButton label="search" />
      </div>
    </div>
  );
};

export default Header;
