import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Header from "../header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
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
        className="max-w-[400px] rounded bg-[#35a653] drop-shadow-xl
       mx-auto  justify-center flex flex-col my-16 p-4"
      >
        <form onSubmit={handleSubmit}>
            <h1 className="text-white font-mono flex justify-center text-2xl underline underline-offset-4 pb-4">Create your account</h1>
          <div className="flex flex-col py-2">
            <label className="py-2 text-white font-mono text-lg">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-1"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 text-white font-mono text-lg">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-1"
              type="password"
            />
          </div>
          <button className="bg-[#17223B] font-mono text-lg drop-shadow-xl rounded drop-shadow hover:bg-[#030617] w-full  p-4 my-2 text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
