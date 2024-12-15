import logo from "../assets/reddit.com.header.png";
import RetroButton from "./RetroButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();
  const [searchInput, setSearchInput] = useState("");

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="flex flex-row items-end gap-1 w-full">
      <div>
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      </div>
      <div className="bg-[#c6def7] flex flex-row gap-2 text-sm h-5 items-end flex-grow">
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
      <div className="flex flex-row items-end gap-1">
        {loggedIn ? (
          <>
            <RetroButton
              label="new post"
              onClick={() => navigate("/new-post")}
            />
            <RetroButton label="logout" onClick={handleLogout} />
          </>
        ) : (
          <>
            <RetroButton
              label="register"
              onClick={() => navigate("/register")}
            />
            <RetroButton label="login" onClick={() => navigate("/login")} />
          </>
        )}
      </div>
      <div className="flex flex-row items-end ml-auto gap-1">
        <input
          type="text"
          placeholder="Search"
          className="border border-black"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <RetroButton label="search" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Header;
