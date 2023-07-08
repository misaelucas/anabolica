import "./assets/fonts.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import { NewProtocolButton } from "./components/NewProtocolButton";
import { Footer } from "./components/Footer";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex sweet  flex-col  justify-between ">
      <Header />
      <div className="">
        <NewProtocolButton />
        <Container />
      </div>
      <Footer />
    </div>
  );
}

export default App;
