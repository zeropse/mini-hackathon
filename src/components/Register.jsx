import { useState } from "react";
import RetroButton from "./RetroButton";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError("");
        localStorage.setItem("token", data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <h1 className="text-3xl font-bold text-[#336699] mb-4 text-center">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-500"
      >
        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}

        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-72 p-2 border-2 rounded-md"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 p-2 border-2 rounded-md"
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-72 p-2 border-2 rounded-md"
        />
        <RetroButton label="Register" className="text-base" />
      </form>
    </div>
  );
};

export default Register;
