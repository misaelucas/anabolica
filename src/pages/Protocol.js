import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from "../components/Header";
import classnames from "classnames";
import "../assets/card.css";
import "../assets/fonts.css";
import { Link, useParams } from "react-router-dom";
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
                Pictures:
                <div
                  id="indicators-carousel"
                  class="relative w-full"
                  data-carousel="static"
                >
                  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div
                      class="hidden duration-700 ease-in-out"
                      data-carousel-item="active"
                    >
                      <img
                        src="/docs/images/carousel/carousel-1.svg"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                    <div
                      class="hidden duration-700 ease-in-out"
                      data-carousel-item
                    >
                      <img
                        src="/docs/images/carousel/carousel-2.svg"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                    <div
                      class="hidden duration-700 ease-in-out"
                      data-carousel-item
                    >
                      <img
                        src="/docs/images/carousel/carousel-3.svg"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                    <div
                      class="hidden duration-700 ease-in-out"
                      data-carousel-item
                    >
                      <img
                        src="/docs/images/carousel/carousel-4.svg"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                    <div
                      class="hidden duration-700 ease-in-out"
                      data-carousel-item
                    >
                      <img
                        src="/docs/images/carousel/carousel-5.svg"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    <button
                      type="button"
                      class="w-3 h-3 rounded-full"
                      aria-current="true"
                      aria-label="Slide 1"
                      data-carousel-slide-to="0"
                    ></button>
                    <button
                      type="button"
                      class="w-3 h-3 rounded-full"
                      aria-current="false"
                      aria-label="Slide 2"
                      data-carousel-slide-to="1"
                    ></button>
                    <button
                      type="button"
                      class="w-3 h-3 rounded-full"
                      aria-current="false"
                      aria-label="Slide 3"
                      data-carousel-slide-to="2"
                    ></button>
                    <button
                      type="button"
                      class="w-3 h-3 rounded-full"
                      aria-current="false"
                      aria-label="Slide 4"
                      data-carousel-slide-to="3"
                    ></button>
                    <button
                      type="button"
                      class="w-3 h-3 rounded-full"
                      aria-current="false"
                      aria-label="Slide 5"
                      data-carousel-slide-to="4"
                    ></button>
                  </div>
                  <button
                    type="button"
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                  >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        class="w-4 h-4 text-white dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                      <span class="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                  >
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        class="w-4 h-4 text-white dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span class="sr-only">Next</span>
                    </span>
                  </button>
                </div>
                {/* {protocol?.imageUrls?.map((item, index) => {
                    return (
                      <div key={index} className="mx-2 flex my-1">
                        <Link to={item} target="_blank">
                          {" "}
                          <img src={item} alt="" className="max-w-sm h-auto" />
                        </Link>
                      </div>
                    );
                  })} */}
              </div>
              <div className="p-2">{protocol?.description}</div>
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
