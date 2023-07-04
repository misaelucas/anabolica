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
import { Link, useNavigate } from "react-router-dom";

export default function Container() {
  const protocolRef = collection(db, "protocols");

  const [protocol, setProtocol] = useState([]);
  const [sortedProtocol, setSortedProtocol] = useState([]);

  useEffect(() => {
    // const getProtocol = async () => {
    //   setProtocol(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    fetchData();
  }, []);
  const fetchData = async () => {
    const docSnap = await getDocs(protocolRef);
    const data = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
    setSortedProtocol(sortedData);
  };
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex flex-col flex-wrap p-4 rounded mt-12 w-11/12 bg-gray-900">
        <div>
          <div className="mb-3 flex">
            <div className="relative mb-4 flex  w-full flex-wrap   items-stretch">
              <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-pink-700 focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(37, 150, 190)] focus:outline-none dark:border-pink-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3"
              />

              <button
                className="relative z-[2] rounded-r bg-white	cursive ml-2 border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-gray-200 hover:bg-opacity-5 hover:text-white hover:border-pink-700 focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                data-te-ripple-init
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-col text-white">
            {sortedProtocol.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-start underline underline-offset-3"
                >
                  <Link to={`/protocol/${item.id}`}>
                    <div className="mt-2 hover:text-pink-500 duration-300">
                      {item.name}
                    </div>
                  </Link>
                </div>
              );
            })}
            {}
          </div>
        </div>
      </div>
    </div>
  );
}
