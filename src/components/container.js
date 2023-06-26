import { useEffect, useState } from "react";
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
  getDocs,
} from "firebase/firestore";
const protocolRef = collection(db, "protocols");
const docSnap = await getDocs(protocolRef);

export default function Container() {
  const [protocol, setProtocol] = useState([]);
  useEffect(() => {
    const getProtocol = async () => {
      const data = await getDocs(protocolRef);
      setProtocol(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.data })));
    };
    getProtocol();
  }, []);

  return (
    <div className=" mx-4 flex-wrap  justify-center rounded text-white dark:bg-gray-800 flex mt-12">
      {protocol.map((item, key) => {
        return (
          <div key={item.id} className="w-1/4 mt-12 border  flex flex-col justify-center text-gray-800 items-center overflow-hidden cursive h-100 m-4 rounded overflow-hidden bg-white shadow-lg">
            <div className="text-xl mb-2 mt-2 justify-center lowercase">{item.name}</div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-700 text-base">{item.age}</div>
              <div
                className="bg-green-500
                   text-white py-1 px-2 rounded text-xs font-bold"
              >
                Natural{" "}
                
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
