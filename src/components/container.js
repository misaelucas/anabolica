import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import "../assets/card.css";
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
    <div className="w-full  flex justify-center">
      <div className="flex justify-center flex-col flex-wrap p-4 rounded mt-12 w-11/12 bg-gray-900	">
        <div>
          <div className="mb-3 flex  ">
            <div className="relative mb-4 flex w-full flex-wrap  items-stretch">
              <input
                type="search"
                className="relative m-0 bg-white	 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3"
              />

              <button
                className="relative z-[2] rounded-r bg-white	 ml-2 border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-gray-200 hover:bg-opacity-5 hover:text-white  focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                data-te-ripple-init
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-wrap basis-1/4 h-36">
            {protocol.map((item) => {
              return (
                <div className="flex cursive basis-1/6  ring-offset-2 ring-2 h-36 p-1 justify-center	rounded-r flex-col m-4  bg-gray-200">
                  <div>
                    <div className="p-2">{item.name}</div>
                    <div className="">
                      <div className="">{item.age}</div>
                      <div className="">red haiir </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
