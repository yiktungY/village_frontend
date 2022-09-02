import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowToRight } from "react-icons/bi";

import Post from "../components/Post";

const SaveJobsList = () => {
  const items = useSelector((state) => state.saveJob);

  return (
    <div className="p-4">
      {items.jobsList.length ? (
        <>
          <div className="flex justify-end px-2">
            {items.totalQuantity} Jobs you like
          </div>
          {items.jobsList.map((post) => (
            <Post key={post.post_id} {...post} />
          ))}
        </>
      ) : (
        <div>
          You haven't add any jobs yet. Please save the job you like by click
          the like icon
        </div>
      )}
      <Link to="/jobs">
        <div className="w-full text-sky-500 text-l font-bold flex flex-row justify-center items-center my-4 hover:text-sky-800">
          See all Jobs <BiArrowToRight className="ml-2 text-2xl" />
        </div>
      </Link>
    </div>
  );
};

export default SaveJobsList;
