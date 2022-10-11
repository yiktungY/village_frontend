import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { saveJobActions } from "../store/saveJob-slice";
import { timeDifferenceForDate } from "../utils/timeDifference";
import { noticiationActions } from "../store/noticiation-slice";
import { jobDetailsActions } from "../store/jobDetails-slice";

const Post = ({
  post_id,
  displayName,
  updatedAt,
  title,
  type,
  status,
  avatarUrl,
}) => {
  const dispatch = useDispatch();
  const saveState = useSelector((state) => state.saveJob);
  const selectedID = useSelector((state) => state.jobDetails.jobID);
  const [totalCount, setTotalCount] = useState(saveState?.totalQuantity);

  const handleAddToList = () => {
    dispatch(
      saveJobActions.addToList({
        post_id,
        displayName,
        updatedAt,
        title,
        type,
        status,
        avatarUrl,
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

  return (
    <li
      className={`relative border-b-2 p-2 my-4 w-full list-none md:border md:w-80 ${
        selectedID === post_id && " border-sky-400 ring-4 "
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-20 items-center mr-2">
          <img
            src={avatarUrl}
            alt={`icon of ${displayName}`}
            className="h-14 w-14 object-cover rounded-full "
          />
          <div>rank</div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <NavLink
            className="w-full"
            key={post_id}
            to={`/jobs/${post_id}`}
            onClick={() => dispatch(jobDetailsActions.getJobID(post_id))}
          >
            <div className="flex flex-col w-full">
              <div className="">{displayName}</div>
              <div className="">{title}</div>
              <div className="flex flex-row overflow-hidden">
                {type.split(",").map((tag, index) => (
                  <div
                    key={index}
                    className="border bg-sky-200 mr-2 p-1 h-fit text-xs"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </NavLink>

          <HiHeart
            className={`absolute top-2 right-2 cursor-pointer text-3xl hover:drop-shadow-lg text-slate-400 ${
              handleSaveState(post_id) && "fill-red-400"
            }`}
            onClick={handleAddToList}
          />
        </div>
      </div>
      <div className="flex justify-end">{timeDifferenceForDate(updatedAt)}</div>
    </li>
  );
};

export default Post;
