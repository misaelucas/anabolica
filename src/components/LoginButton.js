import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const LoginButton = () => {
  const [user, loading, error] = useAuthState(auth);
  const { logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  if (loading) {
    return (
      <div>
        <p></p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <button onClick={handleLogout} className="mb-2 pr-4 text-xl">
        logout
      </button>
    );
  }
  return (
    <div className="flex  pr-4 mt-1 justify-between ">
      <Link to="/login" className="text-lg hover:text-gray-200">
        login
      </Link>
    </div>
  );
};
