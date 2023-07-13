import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Header from "../Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { register } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);

      console.log(e.message);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="max-w-[400px] rounded bg-color drop-shadow-xl
       mx-auto  justify-center flex flex-col my-16 p-4"
      >
        <form onSubmit={handleSubmit} className="text-pink-700 cursive text-xl">
          <h1 className="flex justify-center text-4xl underline underline-offset-4 pb-4">
            Create your account
          </h1>
          <div className="flex flex-col py-2">
            <label className="py-2 ">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="border p-1 text-black"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 ">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-1 text-black"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-1 text-black"
              type="password"
              autoComplete="on"
            />
          </div>
          <button className="bg-[#1e293b] text-white drop-shadow-xl rounded drop-shadow hover:text-pink-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300	 hover:bg-color w-full  p-4 my-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
