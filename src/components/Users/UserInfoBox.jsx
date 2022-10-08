import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLocationPlus, BiTagAlt, BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { IconAndTitle } from "../Elements";

const UserInfoBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error, success, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const handleLocation = () => {
    if (userInfo?.address) {
      let location = userInfo?.address.split(",");
      return `${location[2] || "null"}, ${location[0] || "null"}`;
    }
  };
  return (
    <div className="hidden md:block">
      <div className="fixed left-4 border w-72 p-4 flex flex-col space-y-4 tracking-wider">
        <BiBuildingHouse className="absolute right-2 text-4xl text-yellow-500 " />
        <img
          src={userInfo.avatar_url}
          alt={`icon of ${userInfo.displayName}`}
          className="p-1 w-12 h-12 rounded-full ring-2 ring-gray-300"
        />
        <div className="font-bold">{userInfo.displayName}</div>
        <IconAndTitle title={handleLocation()} icon={<BiLocationPlus />} />
        <IconAndTitle title="Cooking" icon={<BiTagAlt />} />
        <div className="border border-sky-500 text-sky-500 p-2 w-fit hover:text-white hover:bg-sky-500 cursor-pointer">
          Update your profile
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;
