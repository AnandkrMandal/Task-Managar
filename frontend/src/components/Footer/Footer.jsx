import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-white rounded-3xl text-black shadow-xl bottom-0  mx-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center lg:justify-between md:justify-between sm:justify-between  justify-center ">
            <span className="lg:self-center md:self-center text-center text-2xl font-semibold whitespace-nowrap">
            <Logo/>
            </span>
          <ul className="flex flex-row gap-5 font-mono justify-between items-center mt-2 mb-6 text-sm font-medium sm:mb-0 ">
            <li>
              <Link to="#" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
               Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm font-mono text-center text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link to="" className="hover:underline">
            TaskSphare @AnandkrMandal
          </Link>
          .All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
