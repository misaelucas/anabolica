import "./assets/fonts.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import { NewProtocolButton } from "./components/NewProtocolButton";
import "animate.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex sweet  flex-col  justify-between ">
      <Header />
      <div className="">
        <NewProtocolButton />
        <Container />
      </div>
    </div>
  );
}

export default App;
