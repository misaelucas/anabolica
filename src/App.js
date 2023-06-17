import "./App.css";
import "./assets/fonts.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import { NewProtocolButton } from "./components/NewProtocolButton";
function App() {

  const navigate = useNavigate();

  return (
    <div className="flex  flex-col  justify-between ">
      <Header />
      <h1 className="flex justify-center  mt-4 text-5xl ">
        <p className="title">Anabolic Archives</p>
      </h1>
      <NewProtocolButton />
      <Container />
    </div>
  );
}

export default App;
