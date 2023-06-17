import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { db } from "../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const NewProtocol = () => {
  const [protocolName, setProtocolName] = useState("");
  const [duration, setDuration] = useState(0);
  const [age, setAge] = useState(0);
  const [initialWeight, setInitialWeight] = useState(0);
  const [finalWeight, setFinalWeight] = useState(0);
  const [strategy, setStrategy] = useState("");
  const [height, setHeight] = useState("");
  const [substancesUsed, setSubstancesUsed] = useState([]);
  const [kcal, setKcal] = useState("");
  const [macros, setMacros] = useState("");

  const [users, setUsers] = useState([]);
  const [Subject, setSubject] = useState("");

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {};

    getUsers();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Subject !== "") {
      await addDoc(collection(db, "protocols"), {
        Subject,
        completed: false,
      });
      setSubject("");
    }
  };
  return (
    <div>
      <Header />
      {/* <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-16"
      >
        <div><h1 className="title text-2xl">Add your protocol!</h1></div>
        <div className="input-container">
          <input className="flex flex-col w-full rounded border "
            type="text"
            placeholder="what do you want to do?"
            value={Subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button>Add-Todo</button>
        </div>
      </form> */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-16 font-mono"
      >
        <div className="text-4xl tracking-tighter	 font-mono">
          <h1>i'm proud bro</h1>
        </div>
        <div>
          <label className="">
            Name your protocol Name:
            <input className="flex flex-col w-full rounded border "
              type="text"
              value={protocolName}
              onChange={(e) => setProtocolName(e.target.value)}
            />
          </label>
          <br />
          <label className="">
            Duration (in weeks):
            <input className="flex flex-col w-full rounded border "
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </label>
          <br />
          <label className="">
            Your Age:
            <input className="flex flex-col w-full rounded border "
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </label>
          <br />
        </div>
        <label className="">
          Height (in cm):
          <input className="flex flex-col w-full rounded border "
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <br />
        <label className="">
          Initial Weight (in kg):
          <input className="flex flex-col w-full rounded border "
            type="number"
            value={initialWeight}
            onChange={(e) => setInitialWeight(parseFloat(e.target.value))}
          />
        </label>
        <br />
        <label className="">
          Final Weight (in kg):
          <input className="flex flex-col w-full rounded border "
            type="number"
            value={finalWeight}
            onChange={(e) => setFinalWeight(parseFloat(e.target.value))}
          />
        </label>
        <br />
        <label className="">
          Strategy:
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="">Select Strategy</option>
            <option value="cutting">Cutting</option>
            <option value="bulking">Bulking</option>
            <option value="recomp">Recomp</option>
          </select>
        </label>
        <br />

        <label className="">
          Substances Used (comma-separated list):
          <input className="flex flex-col w-full rounded border "
            type="text"
            value={substancesUsed}
            onChange={(e) => setSubstancesUsed(e.target.value.split(","))}
          />
        </label>
        <br />
        <label className="">
          kcal:
          <input className="flex flex-col w-full rounded border "
            type="text"
            value={kcal}
            onChange={(e) => setKcal(e.target.value)}
          />
        </label>
        <br />
        <label className="">
          Macros:
          <input className="flex flex-col w-full rounded border "
            type="text"
            value={macros}
            onChange={(e) => setMacros(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Protocol</button>
      </form>
    </div>
  );
};

export default NewProtocol;
