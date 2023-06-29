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
            <div className="relative mb-4 flex  w-full flex-wrap  items-stretch">
              <input
                type="search"
                className="relative m-0 bg-white 	 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-pink-500 focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(37, 150, 190)] focus:outline-none dark:border-pink-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3"
              />

              <button
                className="relative z-[2] rounded-r bg-white	cursive ml-2 border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-gray-200 hover:bg-opacity-5 hover:text-white hover:border-pink-500 focus:outline-none focus:ring-0"
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
                <div
                  className="flex items-center  overflow-clip		 cursive basis-1/6  bg-sky-200 ring-1	ring-offset-slate-800	 w-2/5  h-2/5	
                 p-1 justify-center	rounded flex-col m-4  bg-gray-200"
                >
                  <div className="flex flex-col justify-start">
                    <div>{item.name}</div>
                    <div className="py-1 px-2 rounded text-xs font-bold bg-green-400 w-fit">
                      natural
                    </div>
                    {/* <div className="p-2">{item.name}</div>
                    <div className="">
                      <div className="">{item.age}</div>
                      <div className="">red haiir </div> */}
                    {/* </div> */}
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
