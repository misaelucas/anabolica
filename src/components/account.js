import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";
import { getAuth, updateProfile } from "firebase/auth";
import { Footer } from "./Footer";

const Account = () => {
  const { user, logout } = UserAuth();
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Account;
