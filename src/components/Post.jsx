import { NavLink } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { saveJobActions } from "../store/saveJob-slice";
import { timeDifferenceForDate } from "../utils/timeDifference";
import { noticiationActions } from "../store/noticiation-slice";
import { useEffect, useState } from "react";
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
  const saveState = useSelector((state) => state.saveJob);
  const [totalCount, setTotalCount] = useState(saveState?.totalQuantity);
  const handleAddToList = async () => {
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
  useEffect(() => {
    if (saveState?.totalQuantity > totalCount) {
      dispatch(
        noticiationActions.showMessage(
          "Successfully added the item to the list"
        )
      );
    }
    if (saveState?.totalQuantity < totalCount) {
      dispatch(noticiationActions.showMessage("Removed the item!"));
    }
    setTotalCount(saveState?.totalQuantity);
  }, [saveState?.totalQuantity]);

  const handleSaveState = (jobId) => {
    const matchJob = saveState.jobsList.find((job) => job.post_id === jobId);
    if (matchJob) {
      return matchJob.saved;
    }
  };

  //get job strucutre
  return (
    <>
      <li className="border-b-2 p-2 my-4 w-full list-none md:border md:w-80 ">
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
            <NavLink className="w-full" key={post_id} to={`/job/${post_id}`}>
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
    </>
  );
};

export default Post;
