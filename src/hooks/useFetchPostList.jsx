import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPostList = ({ number }) => {
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
        const checkPost = posts.slice(1, number);
        setData(checkPost);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handlePostsFromAPI();
  }, []);

  return { data, loading, error };
};

export default useFetchPostList;
