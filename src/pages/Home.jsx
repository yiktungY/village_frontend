import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowToRight } from "react-icons/bi";

import useFetchPostList from "../hooks/useFetchPostList";
import Post from "../components/Post";
import HeroSection from "../components/HeroSection";
import Loading from "../components/Loading";
import SignUp from "../components/Users/SignUp";
import PopUp from "../layout/PopUp";
import { authAction } from "../store/login-slice";
import { noticiationActions } from "../store/noticiation-slice";
import Login from "../components/Users/Login";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loginOpen, isLoggedIn } = useSelector(
    (state) => state.login
  );

  const signUp = useSelector((state) => state.signUp);
  const { data, loading, error } = useFetchPostList();
  const [featureJobs, setFeatureJobs] = useState([]);

  const handleLogin = () => {
    dispatch(authAction.openForm());
  };

  useEffect(() => {
    document.title = "Village | Home";
    const selectData = data.slice(0, 4);
    setFeatureJobs(selectData);
  }, [data]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(noticiationActions.showMessage("Login Successfully"));
      setTimeout(() => {
        dispatch(noticiationActions.hideMessage());
      }, 3000);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (signUp.success) {
      navigate("/dashboard");
      dispatch(noticiationActions.showMessage("Sign Up Successfully"));
      setTimeout(() => {
        dispatch(noticiationActions.hideMessage());
      }, 3000);
    }
    // if (signUp.finishBorading) {
    //   navigate("");
    //   dispatch(noticiationActions.showMessage("Finished boarding!"));
    //   setTimeout(() => {
    //     dispatch(noticiationActions.hideMessage());
    //   }, 3000);
    // }
  }, [signUp.success]);

  // useEffect(() => {
  //   const key = localStorage.getItem("villageToken");
  //   if (key) {
  //     navigate("");
  //   }
  // }, [userInfo, signUp.userInfo]);

  return (
    <div className="container">
      {loginOpen && <PopUp action={handleLogin} children={<Login />} />}
      {isLoggedIn ? (
        <>
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
            featureJobs.map((post) => <Post key={post.post_id} {...post} />)
          )}
          <Link to="/jobs">
            <div className="w-full text-sky-500 text-l font-bold flex flex-row justify-center items-center my-4 hover:text-sky-800">
              See all Jobs <BiArrowToRight className="ml-2 text-2xl" />
            </div>
          </Link>

          <div>People You Follow</div>
          <div>People Recommended for You</div>
          {error !== null && <div>null</div>}
        </>
      ) : (
        <>
          <img
            src="src/assets/images/banner2.jpg"
            alt="banner"
            className="w-full h-40 object-cover "
          />
          <div className="absolute top-28 right-6 text-white font-bold text-lg">
            Continuity. Connection. Community.
          </div>
          <SignUp />
          <div> Explore Village</div>
          <Link to="/jobs">
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
