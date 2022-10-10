import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowToRight } from "react-icons/bi";

import useFetchPostList from "../hooks/useFetchPostList";
import Post from "../components/Post";
import HeroSection from "../components/HeroSection";
import Loading from "../components/Loading";
import SignUp from "../components/Users/SignUp";
import { noticiationActions } from "../store/noticiation-slice";

import UserInfoBox from "../components/Users/UserInfoBox";
const PostDetailsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <img></img>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between w-1/2 m-4">
          <div>user name</div>
          <div>job name</div>
          <div>location</div>
          <div>salary</div>
        </div>
        <div className="flex flex-row justify-start w-1/2 m-4">
          <div>easy apply</div>
          <div>save</div>
          <div>more details</div>
        </div>
      </div>
      <div>start date</div>
      <div>details</div>
      <div>
        <div>info graphs</div>
        <div>duration: can use graph</div>
        <div>how many people apply</div>
        <div>how many people applied</div>
        <div>user rating maybe</div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
