import { useState } from "react";
import { Link } from "react-router-dom";

import { BiSearch, BiAlignRight } from "react-icons/bi";

function Header({ user, logout }) {
  return (
    <div className="flex flex-row border-b-2 border-stone-100 px-2 py-4 justify-between items-center">
      <div className="flex flex-row basis-1/6">icon</div>
      <Link to="/">
        <div className="text-3xl font-bold tracking-wide text-sky-500 hover:text-sky-600">
          Village
        </div>
      </Link>
      <div className="flex flex-row basis-1/6 justify-between">
        <BiSearch className="text-2xl" />
        <BiAlignRight className="text-2xl" />
      </div>
    </div>
  );
}

export default Header;
