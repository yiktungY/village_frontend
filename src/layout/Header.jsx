import { useState } from "react";
import { Link } from "react-router-dom";

import { BiAlignRight, BiStore } from "react-icons/bi";
import { useSelector } from "react-redux";

function Header({ user, logout }) {
  const savedNumber = useSelector((state) => state.saveJob.totalQuantity);
  return (
    <div className="flex flex-row border-b-2 border-stone-100 px-2 py-4 justify-between items-center">
      <div className="flex flex-row basis-1/6">icon</div>
      <Link to="/">
        <div className="text-3xl font-bold tracking-wide text-sky-500 hover:text-sky-600">
          Village
        </div>
      </Link>
      <div className="flex flex-row basis-1/6 justify-between ">
        <Link to="/saveJobs" className="flex justify-start w-10">
          <BiStore className="text-2xl hover:text-sky-600 hover:drop-shadow-lg" />
          {savedNumber > 0 && (
            <div className="w-5 h-5 flex justify-center items-center relative bottom-2 right-3 bg-sky-500 rounded-full text-white text-xs drop-shadow-lg hover:animate-none animate-bounce ease-in-out duration-300">
              {savedNumber}
            </div>
          )}
        </Link>

        <BiAlignRight className="text-2xl hover:text-sky-600 hover:drop-shadow-lg cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
