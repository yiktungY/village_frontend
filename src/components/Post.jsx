import { NavLink } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { saveJobActions } from "../store/saveJob-slice";
import { timeDifferenceForDate } from "../utils/timeDifference";
const Post = ({
  post_id,
  displayName,
  updated_at,
  title,
  type,
  status,
  avatar_url,
}) => {
  const dispatch = useDispatch();
  const saveState = useSelector((state) => state.saveJob.jobsList);

  const handleAddToList = () => {
    dispatch(
      saveJobActions.addToList({
        post_id,
        displayName,
        updated_at,
        title,
        type,
        status,
        avatar_url,
      })
    );
  };

  const handleSaveState = (jobId) => {
    const matchJob = saveState.find((job) => job.post_id === jobId);
    if (matchJob) {
      return matchJob.saved;
    }
  };
  //get job strucutre
  return (
    <li className="border-b-2 p-2 my-4 list-none">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col w-20 items-center mr-2">
          <img
            src={avatar_url}
            alt={`icon of ${displayName}`}
            className="h-14 w-14 object-cover rounded-full "
          />
          <div>rank</div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <NavLink className="w-full" key={post_id} to={`/post/${post_id}`}>
            <div className="flex flex-col w-full">
              <div className="">{displayName}</div>
              <div className="">{title}</div>
              <div className=""> {type}</div>
            </div>
          </NavLink>

          <HiHeart
            className={`cursor-pointer text-3xl hover:drop-shadow-lg text-slate-400 ${
              handleSaveState(post_id) && "fill-red-400"
            }`}
            onClick={handleAddToList}
          />
        </div>
      </div>
      <div className="flex justify-end">
        {timeDifferenceForDate(updated_at)}
      </div>
    </li>
  );
};

export default Post;
