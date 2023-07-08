import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Header from "../Header";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="max-w-[400px] rounded bg-gray-800 drop-shadow-xl
       mx-auto items-center justify-center flex flex-col my-16 p-4"
      >
        <form
          className="cursive text-xl text-pink-700"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col  py-2">
            <label className="py-2 ">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-1 text-black"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2 ">
            <label className="py-2  ">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-1 text-black"
              type="password"
              autoComplete="on"
            />
          </div>
          <button className="bg-gray-900 text-white drop-shadow-xl rounded drop-shadow hover:text-pink-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300	 hover:bg-gray-900 w-full  p-4 my-2">
            Login
          </button>
          <p className="py-2 cursive text-white text-xl">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="underline text-pink-700 p-1 rounded  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-pink-700 hover:text-white duration-300 underline-offset-4"
            >
              Register.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
