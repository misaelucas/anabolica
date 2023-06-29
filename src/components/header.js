import { Link } from "react-router-dom";

import saitama from "../assets/saitama.png";
import { LoginButton } from "./LoginButton";

export default function Header() {
  return (
    <div className="flex text-lg justify-between cursive pt-3 w-full h-14  dark:bg-gray-900 text-white underline underline-offset-4 font-semibold ">
      <div>
        <Link to="/">
          <img
            src={saitama}
            alt="saitama bald head"
            className="pr-2 ml-4 -mt-2 w-16"
          />
        </Link>
      </div>
      <div className="flex text-xl space-x-2 mt-1  "></div>

      <LoginButton />
      {/* <div className="flex  pr-4 mt-1 justify-between ">
        {!user ? (
          <Link to="/login" className="text-xl hover:text-gray-200">
            login
          </Link>
        ) : (
          <button onClick={handleLogout} className="mb-2 text-lg">
            Logout
          </button>
        )}
      </div> */}
    </div>
  );
}
