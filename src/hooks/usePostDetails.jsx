import { useState, useEffect } from "react";
import axios from "axios";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com";

export default function useLogin(props) {
  const [userPostList, setuserPostList] = useState(false);

  const fetchPostsbyUserId = () => {
    const userId = props.match.params.id;
    axios
      .get(`${SERVER_URL}/users/posts/${userId}`)
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
