import { useState, useEffect } from "react";
import axios from "axios";

import Post from "../components/Post";
import HeroSection from "../components/HeroSection";
import Loading from "../components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    return data.data;
  };

  const handlePostsFromAPI = async () => {
    try {
      const posts = await fetchPosts();
      if (posts.length) {
        const checkPost = posts.slice(1, 4);
        setData(checkPost);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    document.title = "VILLIAGE | HOME";
    handlePostsFromAPI();
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
        data.map((post) => <Post {...post} />)
      )}
      <div>See all Jobs</div>
      <div>People You Follow</div>
      <div>People Recommended for You</div>
      {error !== null && <div>null</div>}
    </div>
  );
};

export default Home;
