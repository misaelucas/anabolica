import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../assets/fonts.css";
import { db } from "../firebase/config";
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
  const addCompound = (e) => {
    e.preventDefault();

    const newCompoundObject = {
      substance: protocolSubstance,
      frequency: frequency,
      weeks: weeks,
      dosage: dosage,
      ester: ester,
    };

    setProtocolObject(newCompoundObject);
    setCompoundArray([...compoundArray, newCompoundObject]);
  };

  return (
    <div className="mb-6">
      
      {/* <CompoundList /> */}
      <Header />,
      {loading ? <Loading /> : <></>}

      <section className="max-w-4xl p-6 cursive mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-3xl mb-6 font-bold text-white dark:text-white">
          Create a new one!
        </h1>
        <div>
          <div className="grid text-lg grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
              <label className="text-white dark:text-gray-200">Esters</label>
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
                <option>
                  Injectable (option for stanozolol and Primobolan)
                </option>
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
              disabled={disabled}
              onClick={addCompound}
              className="px-6 py-2 leading-5 tracking-widest text-white transition-colors duration-200 transdiv bg-green-600 rounded-md hover:bg-green-700 focus:outline-none "
            >
              Add compound
            </button>
          </div>
          {compoundArray !== [] ? (
            compoundArray.map((item, i) => {
              return (
                <div
                  key={i}
                  className="p-2 cursive addedSubstanceBlock text-white w-1/2 fix flex justify-center rounded-md shadow-md bg-yellow-600	 mt-3 "
                >
                  <p className="mx-auto  w-max  text-xl flex addedSubstanceBlock">
                    {item.substance} added
                  </p>
                </div>
              );
            })
          ) : (
            <></>
          )}

          <div className="flex justify-end mt-12">
            <button
              onClick={handleSubmit}
              className="px-6 py-2  tracking-widest leading-5 text-white transition-colors duration-200 transdiv bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
              Submit Protocol!
            </button>

          </div>
          
        </div>
      </section>
    </div>
  );
};

export default NewProtocol;
