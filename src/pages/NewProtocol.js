import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../assets/fonts.css";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { settings } from "firebase/analytics";
import { Loading } from "../components/Loading";
import { UserAuth } from "../context/AuthContext";

const NewProtocol = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState();
  const [age, setAge] = useState();
  const [initial, setInitialWeight] = useState();
  const [finalWeight, setFinalWeight] = useState();
  const [strategy, setStrategy] = useState("Recomp");
  const [height, setHeight] = useState("");
  const [kcal, setKcal] = useState("");
  const [protocolSubstance, setProtocolSubstance] = useState("Testosterone");
  const [protocolObject, setProtocolObject] = useState([]);
  const [dosage, setDosage] = useState();
  const [weeks, setWeeks] = useState();
  const [frequency, setFrequency] = useState("Twice a day");
  const [error, setError] = useState();
  const protocolRef = collection(db, "protocols");
  const [disabled, setDisabled] = useState(true);
  const [compoundArray, setCompoundArray] = useState([]);
  const [ester, setEster] = useState("Enanthate");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [initialBf, setInitialBf] = useState();
  const [finalBf, setFinalBf] = useState();
  const [addCompoundString, setAddCompoundString] = useState(false);
  const { user, logout } = UserAuth();
  const [username, setUsername] = useState('')

  const navigate = useNavigate();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const checkDisabled = () => {
      if (
        frequency !== undefined &&
        dosage !== undefined &&
        weeks !== undefined &&
        protocolSubstance !== undefined &&
        ester !== undefined
      ) {
        setDisabled(false);
      }
    };
    setUsername(user.displayName);
    checkDisabled();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "protocols"), {
        name: name,
        age: age,
        duration: duration,
        initial: initial,
        finalWeight: finalWeight,
        strategy: strategy,
        height: height,
        kcal: kcal,
        protocol: compoundArray,
        description: description,
        initialBf: initialBf,
        finalBf: finalBf,
        user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        
      });
      setLoading(true);
      await delay(2000);
      setLoading(false);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  const addCompound = async (e) => {
    e.preventDefault();
    setAddCompoundString(true);
    const newCompoundObject = {
      substance: protocolSubstance,
      frequency: frequency,
      weeks: weeks,
      dosage: dosage,
      ester: ester,
      user: user.displayName,
    };

    setProtocolObject(newCompoundObject);
    setCompoundArray([...compoundArray, newCompoundObject]);
    await delay(1000);
    setAddCompoundString(false);
  };

  return (
    <div className="mb-6">
      <Header />,{loading ? <Loading /> : <></>}
      <section className="max-w-4xl p-6 cursive mx-auto  rounded-md shadow-md dark:bg-gray-900 mt-20">
        <h1 className="text-3xl mb-6 font-bold text-white dark:text-white">
          Create a new one!
        </h1>
        <div className="grid textLg grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
              minlength="5"
              maxLength={42}
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
            <label className="text-white dark:text-gray-200" htmlFor="duration">
              Duration:
            </label>
            <input
              onChange={(e) => setDuration(e.target.value)}
              id="duration"
              type="number"
              required
              placeholder="in weeks"
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
            <label className="text-white dark:text-gray-200" htmlFor="height">
              Initial Body Fat:
            </label>
            <input
              onChange={(e) => setInitialBf(e.target.value)}
              type="number"
              required
              placeholder="in percentage"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="height">
              Final Body Fat:
            </label>
            <input
              onChange={(e) => setFinalBf(e.target.value)}
              type="number"
              required
              placeholder="in percentage"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200">Strategy:</label>
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
              Calories:
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
              Add compound to your protocol:
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
          <div className="">
            <label className="text-white dark:text-gray-200">Esters:</label>
            <select
              onChange={(e) => setEster(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Enanthate</option>
              <option>Propionate</option>
              <option>Cypionate</option>
              <option>Decanoate</option>
              <option>Undecanoate</option>
              <option>Phenylproprionate</option>
              <option>Oral</option>
              <option>Injectable (option for stanozolol and Primobolan)</option>
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
          {addCompoundString ? (
            <button
              type="submit"
              disabled={disabled}
              onClick={addCompound}
              className="px-6 py-2 bg-green-800 leading-5 tracking-widest text-white transition-colors duration-200 transdiv bg-green-600 rounded-md hover:bg-green-700 focus:outline-none "
            >
              <p className="uppercase">Added!!</p>
            </button>
          ) : (
            <button
              type="submit"
              disabled={disabled}
              onClick={addCompound}
              className="bg-pink-600 text-white drop-shadow-xl hover:text-gray-900 rounded drop-shadow transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300	  w-full  p-4 my-2 "
            >
              {" "}
              <p>Add Compound</p>
            </button>
          )}

          <div className="w-full">
            <label
              htmlFor="message"
              className="block mb-2 textLg font-medium text-gray-900 dark:text-white"
            >
              Describe your experience.
            </label>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 roundedLg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            ></textarea>
          </div>
          <br />
          <div className="flex justify-start   mt-12">
            <button
              onClick={handleSubmit}
              className="bg-pink-600 text-white drop-shadow-xl rounded drop-shadow hover:text-gray-900  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 p-2"
            >
              Submit Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProtocol;
