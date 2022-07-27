import { useState, useEffect } from "react";
import axios from "axios";


export default function useLogin(props) {
  const [userPostList, setuserPostList] = useState(false);

  const fetchPostsbyUserId = () => {
    const userId = props.match.params.id;
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/posts/${userId}`)
      .then((posts) => {
        setuserPostList(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  useEffect(() => {
    // loginFunction();

    fetchPostsbyUserId();
  }, [userInfo.displayName]);

  return { userPostList };
}
