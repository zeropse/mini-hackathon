import RetroButton from "./RetroButton";

const PageLogin = () => {
  return (
    <div className="flex justify-end">
      <div className="inline-flex flex-col items-end text-xs pr-1 mt-1 max-w-fit max-h-fit border border-[#336699] p-2">
        <div className="flex flex-row gap-1 mb-1">
          <input
            type="text"
            placeholder="username"
            aria-label="Username"
            className="border border-black px-1 py-0.5"
          />
          <input
            type="password"
            placeholder="password"
            aria-label="Password"
            className="border border-black px-1 py-0.5"
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-1" />
            <span>remember me</span>
          </label>
          <p className="text-[#336699] hover:underline cursor-pointer">
            recover password
          </p>
          <RetroButton label="login" />
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
