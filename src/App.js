import "./App.css";
import "./assets/fonts.css";
import React from "react";

import Signin from "./components/auth/signIn";
import Signup from "./components/auth/signUp";
import Account from "./components/account";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import Container from "./components/container";
import Header from "./components/header";

function App() {
  return (
    <div className="flex  flex-col  justify-between ">
      <Header />

      <h1 className="flex justify-center  mt-4 text-5xl ">
        <p className="title">Anabolic Archives</p>
      </h1>
      <Container />
    </div>
  );
}

export default App;
