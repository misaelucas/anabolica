import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";
import { getAuth, updateProfile } from "firebase/auth";

const Account = () => {
  const { user, logout } = UserAuth();
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth);
  return (
    <>
      <Header />
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className="flex mt-12 text-white dark:text-gray-200 cursive justify-center   ">
        <div className="bg-gray-900 p-6 rounded">
          <div className="title text-3xl mt-4 ">Edit your account</div>
          <div className="mt-4">
            <label className="text-white dark:text-gray-200">
              Set your username:
            </label>
            <input
              onChange={(e) => setDisplayName(e.target.value)}
              id="username"
              type="text"
              placeholder=""
              required
              maxLength={42}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="mt-4">
            <label className="text-white dark:text-gray-200">
              Add a profile picture:
            </label>
            <input
              onChange={(e) => setDisplayName(e.target.value)}
              id="username"
              type="text"
              placeholder=""
              required
              maxLength={42}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
