import React from "react";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="flex flex-wrap justify-center text-sm">
      <div className="flex my-2 mt-3">
        2023 Anabolic Archives - made by misa.
        <Link className="ml-2 text-xl " to="https://github.com/misaelucas">
          <BsGithub />
        </Link>
      </div>
    </div>
  );
};
