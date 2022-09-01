import { useState } from "react";
import { useSelector } from "react-redux";

import Post from "../components/Post";

const SaveJobsList = () => {
  const items = useSelector((state) => state.saveJob);

  return (
    <>
      {items.jobsList.map((post) => (
        <Post key={post.post_id} {...post} />
      ))}
    </>
  );
};

export default SaveJobsList;
