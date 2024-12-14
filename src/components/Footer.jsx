import wiredLogo from "../assets/wired_logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col text-center gap-2">
      <div className="flex justify-center text-[#336699] text-sm">
        <ul className="flex items-center gap-1">
          <li className="hover:underline cursor-pointer">feedback</li>
          <span className="text-gray-500">|</span>
          <li className="hover:underline cursor-pointer">bookmarklets</li>
          <span className="text-gray-500">|</span>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => window.open("https://amazon.com", "_blank")}
          >
            store
          </li>

          <span className="text-gray-500">|</span>
          <li className="hover:underline cursor-pointer">advertise</li>
        </ul>
      </div>

      <div className="flex flex-row justify-center items-center gap-x-2 text-center text-xs">
        <img src={wiredLogo} alt="Wired Logo" className="w-4 h-4" />
        <div className="underline">
          <a
            href="https://www.wired.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#336699]"
          >
            WIRED.com
          </a>
        </div>
        <span className="text-gray-500">-</span>
        <div className="underline ">
          <a
            href="https://howto.wired.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#336699]"
          >
            WIRED How-To
          </a>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy(c) 2008 CondeNet, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
