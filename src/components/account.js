import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./header";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="max-w-[600px] mx-auto my-16 p-4">
        <h1 className="text-2xl font-bold py-4">Account</h1>
        <p>User Email: {user && user.email}</p>

      </div>
    </>
  );
};

export default Account;
