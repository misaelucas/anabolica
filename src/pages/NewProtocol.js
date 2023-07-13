import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../assets/fonts.css";
import { db, auth } from "../firebase/config";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  child,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Loading } from "../components/Loading";
import { UserAuth } from "../context/AuthContext";
import { Footer } from "../components/Footer";
import { storage } from "../firebase/config";
import { useTabs } from "@material-tailwind/react";

const NewProtocol = () => {
  const [name, setName] = useState("");
  const [protocolDate, setProtocolDate] = useState("");
  const [protocolFinalDate, setProtocolFinalDate] = useState("");
  const [duration, setDuration] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [initial, setInitialWeight] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [strategy, setStrategy] = useState("recomp");
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
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPos, setImagesPos] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
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
    setCreatedAt(getTimestampInSeconds);
    setUsername(user.displayName);
    checkDisabled();
    console.log("asdsa", images);
    console.log("imagepos", imagesPos);
  });

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  const uploadFiles = async (images, imagesPos) => {
    const storageRef = ref(storage);
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imagePath = `images/${username}/${getTimestampInSeconds()}/${
        images[i].name
      }`;
      const imageRef = ref(storageRef, imagePath);

      try {
        await uploadBytes(imageRef, images[i]);
        const imageUrl = await getDownloadURL(imageRef);
        setImageUrls((prevUrls) => [...prevUrls, imageUrl]);

        imageUrls.push(imageUrl);
        console.log("success");
      } catch (error) {
        console.log("error:", error);
      }
    }
    console.log(imageUrls);
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadedImageUrls = await uploadFiles(images);

    try {
      await addDoc(collection(db, "protocols"), {
        name: name,
        gender: gender,
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
        createdAt: createdAt,
        imageUrls: uploadedImageUrls,
        protocolDate: protocolDate,
        protocolFinalDate: protocolFinalDate,
      });
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
      <section className="max-w-4xl p-6 cursive mx-auto rounded-md shadow-md bg-color mt-20">
        <h1 className="text-3xl mb-6 font-bold text-white text-white">
          Create a new one!
        </h1>
        <div className="grid textLg grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white text-gray-200">
              Name your protocol:
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="username"
              type="text"
              placeholder="em palavrinhas"
              required
              minLength="5"
              maxLength={42}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200">
              Início do Protocolo:
            </label>
            <input
              onChange={(e) => setProtocolDate(e.target.value)}
              type="date"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200">
              Fim do protocolo:
            </label>
            <input
              onChange={(e) => setProtocolFinalDate(e.target.value)}
              type="date"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="">
            <label className="text-white text-gray-200">Gênero:</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Homem</option>
              <option>Mulher</option>
            </select>
          </div>
          <div>
            <label className="text-white text-gray-200">Your age:</label>
            <input
              onChange={(e) => setAge(e.target.value)}
              type="number"
              min="14"
              placeholder="em anos"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200" htmlFor="duration">
              Duração:
            </label>
            <input
              onChange={(e) => setDuration(e.target.value)}
              id="duration"
              type="number"
              min="1"
              required
              placeholder="em semanas"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-white text-gray-200" htmlFor="height">
              Altura:
            </label>
            <input
              onChange={(e) => setHeight(e.target.value)}
              id="height"
              type="number"
              min="120"
              required
              placeholder="em centímetros"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200" htmlFor="height">
              Peso Inicial:
            </label>
            <input
              onChange={(e) => setInitialWeight(e.target.value)}
              type="number"
              required
              min="30"
              placeholder="em kgs"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200" htmlFor="height">
              Peso Final:
            </label>
            <input
              onChange={(e) => setFinalWeight(e.target.value)}
              type="number"
              required
              min="30"
              placeholder="em kgs"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200" htmlFor="height">
              BF Inicial:
            </label>
            <input
              onChange={(e) => setInitialBf(e.target.value)}
              type="number"
              required
              min="3"
              placeholder="em porcentagem"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200" htmlFor="height">
              BF Final:
            </label>
            <input
              onChange={(e) => setFinalBf(e.target.value)}
              type="number"
              required
              min="3"
              placeholder="em porcentagem"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200">Estratégia:</label>
            <select
              required
              onChange={(e) => setStrategy(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>recomp</option>
              <option>cutting</option>
              <option>bulking</option>
            </select>
          </div>
          <div className="mb-16">
            <label className="text-white text-gray-200" htmlFor="height">
              Ingestão Calórica:
            </label>
            <input
              onChange={(e) => setKcal(e.target.value)}
              type="number"
              required
              min="500"
              placeholder="em kcals"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div></div>
          <div className="flex flex-col w-full">
            <p className="text-white text-xl my-2 flex uppercase justify-center">
              PRÉ PROTOCOLO
            </p>

            <div className="App flex w-full">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 bg-gray-800 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">
                        Clique para adicionar fotos
                      </span>{" "}
                      ou arraste
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={(event) => {
                      setImages(event.target.files);
                    }}
                    multiple
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-white text-xl my-2 flex uppercase justify-center">
              PÓS PROTOCOLO
            </p>
            <div className="App flex w-full">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file-pos"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 bg-gray-800 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">
                        Clique para adicionar fotos
                      </span>{" "}
                      ou arraste
                    </p>
                  </div>
                  <input
                    id="dropzone-file-pos"
                    onChange={(event) => {
                      setImagesPos(event.target.files);
                    }}
                    multiple
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="">
            <label className="text-white text-gray-200">
              Adicionar composto ao protocolo:
            </label>
            <select
              onChange={(e) => setProtocolSubstance(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Testosterona</option>
              <option>Nandrolona</option>
              <option>Masteron</option>
              <option>Boldenona</option>
              <option>Primobolan</option>
              <option>Oxandrolona</option>
              <option>Dianabol</option>
              <option>Turinabol</option>
              <option>Stanozolol</option>
              <option>Halostenin</option>
              <option>Hemogenin</option>
            </select>
          </div>
          <div className="">
            <label className="text-white text-gray-200">Esters:</label>
            <select
              onChange={(e) => setEster(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Enantato</option>
              <option>Propionato</option>
              <option>Cipionato</option>
              <option>Decanoato</option>
              <option>Undecanoato</option>
              <option>Fempropionato</option>
              <option>Oral</option>
              <option>injetável (opção para stanozolol e primobolan)</option>
            </select>
          </div>
          <div>
            <label className="text-white text-gray-200">Dosagem</label>
            <input
              type="number"
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                setDosage(input);
              }}
              min="0"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200">How many weeks?</label>
            <input
              onChange={(e) => setWeeks(e.target.value)}
              id="weeks"
              min="0"
              type="number"
              placeholder="in weeks"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white text-gray-200">Frequência</label>
            <select
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                setFrequency(input);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md bg-gray-800 text-black border-gray-600 focus:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>Três vezes ao dia</option>
              <option>Duas vezes ao dia</option>
              <option>Todo dia</option>
              <option>A cada 2 dias</option>
              <option>A cada 3 dias</option>
              <option>A cada 4 dias</option>
              <option>A cada 5 dias</option>
              <option>A cada 6 dias</option>
              <option>A cada 7 dias</option>
              <option>A cada 10 dias</option>
              <option>A cada 14 dias</option>
            </select>
          </div>
          {addCompoundString ? (
            <button
              type="submit"
              disabled={disabled}
              onClick={addCompound}
              className="px-6 py-2  leading-5 tracking-widest text-white transition-colors duration-200 transdiv  rounded-md bg-pink-300 focus:outline-none "
            >
              <p className="uppercase">Adicionado!</p>
            </button>
          ) : (
            <button
              type="submit"
              disabled={disabled}
              onClick={addCompound}
              className=" bg-pink-600 text-white drop-shadow-xl  hover:text-gray-900 rounded drop-shadow transition ease-in-out  delay-150 sm:mt-6 py-2 sm:py-0"
            >
              {" "}
              <p>Adicionar Composto</p>
            </button>
          )}

          <div className="w-full">
            <label
              htmlFor="message"
              className="block mb-2 textLg font-medium text-gray-900 text-white"
            >
              Descreva sua experiência.
            </label>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-black bg-white roundedLg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
            ></textarea>
          </div>
          <br />
          <div className="flex justify-start   mt-12">
            <button
              onClick={handleSubmit}
              className="bg-pink-600 text-white drop-shadow-xl rounded drop-shadow hover:text-gray-900  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 p-2"
            >
              Enviar Protocolo
            </button>
          </div>
        </div>
      </section>
      <div className="mt-2">
        <Footer />
      </div>
    </div>
  );
};

export default NewProtocol;
