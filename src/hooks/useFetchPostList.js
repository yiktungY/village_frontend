import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPostList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchPosts = async () => {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    return data.data;
  };

  const handlePostsFromAPI = async () => {
    try {
      const posts = await fetchPosts();
      if (posts.length) {
        setTotal(posts.length);
        setData(posts);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handlePostsFromAPI();
  }, []);

  return { data, loading, error, total };
};

export default useFetchPostList;
