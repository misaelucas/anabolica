import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from "../components/Header";
import "../assets/card.css";
import "../assets/fonts.css";

import { useParams } from "react-router-dom";

const Protocol = () => {
  const [protocol, setProtocol] = useState("");
  let { id } = useParams();
  console.log(id);
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
        <div className="flex justify-center max-w-screen-lg mt-8 min-w-full">
          <div className="flex p-2 text-white min-w-80 flex-col overflow-hidden  bg-gray-900 border rounded-sm border-pink-700 max-w-[90%]">
            <div className="protocol-title flex ml-1">{protocol?.name}</div>
            <div className="mt-2 underline protocol-fields underline-offset-2 ">
              {protocol?.user?.name}
            </div>

            <div className="flex flex-col protocol-fields mt-2  py-2 px-1  bg-gray-800">
              <div className="p-1">Duration: {protocol?.duration} weeks</div>
              <div className="p-1">Height: {protocol?.height} cms</div>

              <div className="p-1">Initial weight: {protocol?.initial} kgs</div>
              <div className="p-1">
                Final weight: {protocol?.finalWeight} kgs
              </div>
              <div className="p-1">
                Initial body fat: {protocol?.initialBf}%
              </div>
              <div className="p-1">Final body fat: {protocol?.finalBf}%</div>
              <div className="p-1">Calories: {protocol?.kcal} kcals</div>
              <div className="p-1">{protocol?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocol;
