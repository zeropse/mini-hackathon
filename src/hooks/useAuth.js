import { useState, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return { loggedIn, logout };
};

export default useAuth;
