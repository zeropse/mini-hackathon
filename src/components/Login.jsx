import { useState } from "react";
import RetroButton from "./RetroButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        window.location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <h1 className="text-3xl font-bold text-[#336699] mb-4 text-center">
        Login
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-500"
      >
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="w-72 p-2 border-2 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-72 p-2 border-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RetroButton label="Login" className="text-base" />
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
