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
  const [name, setName] = useState("");
  const [duration, setDuration] = useState();
  const [age, setAge] = useState();
  const [initial, setInitialWeight] = useState();
  const [finalWeight, setFinalWeight] = useState();
  const [strategy, setStrategy] = useState("Recomp");
  const [height, setHeight] = useState("");
  const [substancesUsed, setSubstancesUsed] = useState([]);
  const [kcal, setKcal] = useState("");
  const [users, setUsers] = useState([]);
  const [Subject, setSubject] = useState("");
  const [protocolSubstance, setProtocolSubstance] = useState();
  const [protocolArray, setProtocolArray] = useState([]);
  const [dosage, setDosage] = useState();
  const [weeks, setWeeks] = useState();
  const [frequency, setFrequency] = useState();

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
        name,
      });
      setSubject("");
    }
  };

  const addCompound = (e) => {
    e.preventDefault();
    setProtocolArray(e);
  };
  return (
    <div className="mb-6">
      <Header />
      <section className="max-w-4xl p-6 cursive mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-3xl mb-6 font-bold text-white dark:text-white">
          Create a new one!
        </h1>
        <div>
          <div className="grid text-xl grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Name your protocol:
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="username"
                type="text"
                placeholder="in words"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Your age:</label>
              <input
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="in years"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="duration"
              >
                Duration:
              </label>
              <input
                onChange={(e) => setDuration(e.target.value)}
                id="duration"
                type="number"
                required
                placeholder="in numbers"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="height">
                Height:
              </label>
              <input
                onChange={(e) => setHeight(e.target.value)}
                id="height"
                type="number"
                required
                placeholder="in cms"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="height">
                Initial Weight:
              </label>
              <input
                onChange={(e) => setInitialWeight(e.target.value)}
                type="number"
                required
                placeholder="in kgs"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="height">
                Final Weight:
              </label>
              <input
                onChange={(e) => setFinalWeight(e.target.value)}
                type="number"
                required
                placeholder="in kgs"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Strategy</label>
              <select
                required
                onChange={(e) => setStrategy(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Recomp</option>
                <option>Cutting</option>
                <option>Bulking</option>
              </select>
            </div>
            <div className="mb-16">
              <label className="text-white dark:text-gray-200" htmlFor="height">
                CALORIES:
              </label>
              <input
                onChange={(e) => setKcal(e.target.value)}
                type="number"
                required
                placeholder="in kcals"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="">
              <label className="text-white dark:text-gray-200">
                Add compound to your protocol
              </label>
              <select
                onChange={(e) => setProtocolSubstance(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Testosterone</option>
                <option>Nandrolone</option>
                <option>Masteron</option>
                <option>Boldenone</option>
                <option>Primobolan</option>
                <option>Oxandrolone</option>
                <option>Dianabol</option>
                <option>Turinabol</option>
                <option>Stanozolol</option>
                <option>Halostenin</option>
                <option>Oxymetholone</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Dosage</label>
              <input
                onChange={(e) => setDosage(e.target.value)}
                type="number"
                placeholder="in mgs"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                How many weeks?
              </label>
              <input
                onChange={(e) => setWeeks(e.target.value)}
                id="weeks"
                type="number"
                placeholder="in weeks"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Frequency</label>
              <select
                onChange={(e) => setFrequency(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Twice a day</option>
                <option>Every day</option>
                <option>Every 2 days</option>
                <option>Every 3 days</option>
                <option>Every 4 days</option>
                <option>Every 5 days</option>
                <option>Every 6 days</option>
                <option>Every 7 days</option>
                <option>Every 10 days</option>
                <option>Every 14 days</option>
              </select>
            </div>

            <button
              type="submit"
              onClick={addCompound}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transdiv bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
            >
              Add compound
            </button>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={setProtocolArray}
              className="px-6 py-2 uppercase leading-5 text-white transition-colors duration-200 transdiv bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
            >
              Submit!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProtocol;
