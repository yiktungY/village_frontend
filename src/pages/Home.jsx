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
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loginOpen, isLoggedIn } = useSelector(
    (state) => state.login
  );

  const signUp = useSelector((state) => state.signUp);
  const { data, loading, error } = useFetchPostList();
  const [featureJobs, setFeatureJobs] = useState([]);

  useEffect(() => {
    document.title = "Village | Home";
    const selectData = data.slice(0, 4);
    setFeatureJobs(selectData);
  }, [data]);

  // useEffect(() => {
  //   // if (isLoggedIn) {
  //   //   dispatch(noticiationActions.showMessage("Login Successfully"));
  //   // }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (signUp.success) {
      navigate("/dashboard");
      dispatch(noticiationActions.showMessage("Sign Up Successfully"));
    }
    if (signUp.finishBorading) {
      navigate("");
      dispatch(noticiationActions.showMessage("Finished boarding!"));
    }
  }, [signUp]);

  // useEffect(() => {
  //   const key = localStorage.getItem("villageToken");
  //   if (key) {
  //     navigate("");
  //   }
  // }, [userInfo, signUp.userInfo]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {isLoggedIn ? (
        <>
          <HeroSection />
          <div className="m-4 border-2 border-sky-500 w-full"></div>
          <div className="flex flex-row w-4/5 justify-end">
            <UserInfoBox />
            <div>
              <div className="md:text-xl md:font-bold">
                Jobs Recommended for You
              </div>
              <div>
                Recommendedation are based on your location and job preferences.
              </div>
              <div className="md:grid md:grid-rows-2 grid-flow-col gap-4">
                {loading ? (
                  <>
                    <Loading />
                    <Loading />
                    <Loading />
                    <Loading />
                  </>
                ) : (
                  featureJobs.map((post) => (
                    <Post key={post.post_id} {...post} />
                  ))
                )}
              </div>
              <Link to="/jobs/new">
                <div className="w-full text-sky-500 text-l font-bold flex flex-row justify-center items-center my-4 hover:text-sky-800">
                  See all Jobs <BiArrowToRight className="ml-2 text-2xl" />
                </div>
              </Link>

              <div>People You Follow</div>
              <div>People Recommended for You</div>
              {error !== null && <div>null</div>}
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src="src/assets/images/banner2.jpg"
            alt="banner"
            className="w-full h-40 object-cover md:absolute md:h-5/6 md:top-20 md:opacity-70"
          />
          <div className="m-4 absolute top-28 right-6 text-grey font-bold text-lg md:relative md:top-0 md:right-0 md:text-4xl md:m-6">
            Continuity. Connection. Community.
          </div>
          <SignUp />
          <div> Explore Village</div>
          <Link to="/jobs/new">
            <div className="w-full text-sky-500 text-l font-bold flex flex-row justify-center items-center my-4 hover:text-sky-800">
              See all Jobs <BiArrowToRight className="ml-2 text-2xl" />
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
