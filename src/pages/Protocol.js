import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from "../components/Header";
import classnames from "classnames";

import "../assets/card.css";
import "../assets/fonts.css";

import { useParams } from "react-router-dom";
import { Footer } from "../components/Footer";

const Protocol = () => {
  const [protocol, setProtocol] = useState("");
  let { id } = useParams();
  const docRef = doc(db, "protocols", id);
  const getInfo = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProtocol(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center  items-center bg- ">
        <div className="flex justify-center  mt-8 min-w-full">
          <div className="flex p-2 text-white w-[80%] flex-col overflow-hidden  bg-gray-900 border rounded-sm border-pink-700 max-w-[90%]">
            <div className="protocol-title flex ml-1">{protocol?.name}</div>
            <div className="flex p-2 text-sm">
              <ul className="flex">
                {protocol?.protocol?.length === 0 ? (
                  <li className="px-1 bg-green-500 h-6 items-center flex mr-2 rounded protocol-markup ">
                    natural
                  </li>
                ) : (
                  <li className="px-1 bg-pink-600 mr-2 h-6 items-center flex protocol-markup rounded">
                    hormonized
                  </li>
                )}
                <p
                  className={classnames({
                    "px-1 bg-yellow-500 h-6 items-center flex protocol-markup rounded":
                      protocol?.strategy === "bulking",
                    "px-1 bg-violet-500 h-6 items-center flex protocol-markup rounded":
                      protocol?.strategy === "recomp",
                    "px-1 bg-blue-500 h-6 items-center flex protocol-markup rounded":
                      protocol?.strategy === "cutting",
                  })}
                >
                  {protocol?.strategy}
                </p>
              </ul>
            </div>
            <div className="mt-2 p-2 underline protocol-fields underline-offset-2 ">
              {protocol?.user?.name}
            </div>

            <div className="flex flex-col rounded protocol-fields mt-2  py-2 px-1  bg-gray-800">
              <div className="protocol-fields cursive text-xl px-1">
                User Information
              </div>
              <div className="pl-1 mt-2 ">
                <div className="p-1">Age: {protocol.age}</div>
                <div className="p-1">Height: {protocol?.height} cms</div>
                <div className="p-1">Weight: {protocol?.initial} kgs</div>
                <div className="p-1">BF: {protocol?.initialBf}%</div>
              </div>
            </div>
            <div className="bg-gray-800 protocol-fields rounded mt-2  py-2 px-1">
              <div className="protocol-fields cursive text-xl p-1 pb-2">
                Protocol Details
              </div>
              <div className="pl-1">
                <div className="p-1">Duration: {protocol?.duration} weeks</div>
                <div className="p-1">Calories: {protocol?.kcal} kcals</div>
                <div className="p-1">
                  Final weight: {protocol?.finalWeight} kgs
                </div>
                <div className="p-1">Final BF: {protocol?.finalBf}%</div>
              </div>
            </div>
            <div className="flex flex-col mt-2 rounded bg-gray-800 py-2 px-1">
              <div className="protocol-fields cursive text-xl p-1 pb-2">
                Description:
              </div>
              <div className="p-2">{protocol?.description}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Protocol;
