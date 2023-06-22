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
    <div className="w-912 mx-4 flex-wrap pt-10 justify-center rounded dark:bg-gray-800 flex mt-12">
      {protocol.map((item) => {
        return (
          <div className="w-1/5 m-5 rounded items-center justify-center flex bg-green-600 h-64">
            <div className="flex flex-col">
              <div className="titulo  ">{item.name}</div>
            </div>
          </div>
        );
      })}

    </div>
  );
}
