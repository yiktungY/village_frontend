import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../components/Loading";
import useFetchPostList from "../hooks/useFetchPostList";
import Post from "../components/Post";

const PostListPage = () => {
  
  const { data, loading, error } = useFetchPostList(5);


  useEffect(() => {
    document.title = "Village | Jobs";
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        data.map((post) => <Post key={post.post_id} {...post} />)
      )}
      {error !== null && <div>null</div>}
    </div>
  );
};

export default PostListPage;
