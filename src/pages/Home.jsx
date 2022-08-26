import { useState, useEffect } from "react";


import { BiArrowToRight } from "react-icons/bi";

import useFetchPostList from "../hooks/useFetchPostList";
import Post from "../components/Post";
import HeroSection from "../components/HeroSection";
import Loading from "../components/Loading";

const Home = () => {
  const { data, loading, error } = useFetchPostList(4);

  useEffect(() => {
    document.title = "Village | Home";
  }, []);

  return (
    <div className="container">
      <HeroSection />
      <div className="m-4 border-2 border-sky-500"></div>
      <div>Jobs Recommended for You</div>
      <div>
        Recommendedation are based on your location and job preferences.
      </div>
      {loading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        data.map((post) => <Post key={post.post_id} {...post} />)
      )}
      <div className="w-full text-sky-500 text-l font-bold flex flex-row justify-center items-center my-4">
        See all Jobs <BiArrowToRight />
      </div>
      <div>People You Follow</div>
      <div>People Recommended for You</div>
      {error !== null && <div>null</div>}
    </div>
  );
};

export default Home;
