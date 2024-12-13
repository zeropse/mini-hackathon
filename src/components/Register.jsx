import RetroButton from "./RetroButton";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <h1 className="text-3xl font-bold text-[#336699] mb-4 text-center">
        register
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-500">
        <input
          type="text"
          placeholder="Username"
          className="w-72 p-2 border-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-72 p-2 border-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-72 p-2 border-2 rounded-md"
        />
        <RetroButton label="Register" className="text-base" />
      </div>
    </div>
  );
};

export default Register;
