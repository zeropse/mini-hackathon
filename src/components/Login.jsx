import RetroButton from "./RetroButton";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <h1 className="text-3xl font-bold text-[#336699] mb-4 text-center">
        login
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-500">
        <input
          type="text"
          placeholder="Username"
          aria-label="Username"
          className="w-72 p-2 border-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          className="w-72 p-2 border-2 rounded-md"
        />
        <div className="flex items-center justify-between w-72">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <p className="text-[#336699] hover:underline cursor-pointer text-sm">
            Recover password
          </p>
        </div>
        <RetroButton label="Login" className="text-base" />
      </div>
    </div>
  );
};

export default Login;
