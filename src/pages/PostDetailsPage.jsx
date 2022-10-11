import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowToRight, BiDotsHorizontalRounded } from "react-icons/bi";

import { Button, SubTitle } from "../components/Elements";
import PopUp from "../layout/PopUp";
import Loading from "../components/Loading";
import { saveJobActions } from "../store/saveJob-slice";
import { readableTimestamp } from "../utils/timeDifference";

const PostDetailsPage = () => {
  const dispatch = useDispatch();
  const saveState = useSelector((state) => state.saveJob);
  const { jobInfo, jobID, suceess } = useSelector((state) => state.jobDetails);
  const [openImage, setOpenImage] = useState(false);
  const handleAddToList = () => {
    dispatch(saveJobActions.addToList(jobInfo));
  };
  const handleSaveState = (jobId) => {
    const matchJob = saveState.jobsList.find((job) => job.post_id === jobId);
    if (matchJob) {
      return matchJob.saved;
    }
  };
  return (
    <div className="flex flex-col w-full h-fit">
      {Object.keys(jobInfo).length > 0 ? (
        <>
          <img
            className="h-60 object-cover cursor-pointer"
            src={jobInfo.picture_Details}
            alt={jobInfo.title}
            onClick={() => setOpenImage(!openImage)}
          />
          {openImage && (
            <PopUp
              action={() => setOpenImage(!openImage)}
              children={
                <img
                  className="w-72"
                  src={jobInfo.picture_Details}
                  alt={jobInfo.title}
                />
              }
            />
          )}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-between w-1/2 m-4">
              <div>{jobInfo.displayname}</div>
              <div className="font-bold text-xl">{jobInfo.title}</div>
              <div>location</div>
              <div>{jobInfo.salary}</div>
            </div>
            <div className="flex flex-row justify-start w-1/2 h-20 m-4">
              <Button disable={true} action="Easy Apply" />
              <Button
                disable={true}
                action={handleSaveState(jobInfo.post_id) ? "Saved" : "Save"}
                handleAction={handleAddToList}
              />
            </div>
          </div>

          <div className="m-4">
            <SubTitle
              children={`Require Date: ${readableTimestamp(
                jobInfo.requireDate,
                "M D, Y",
                "month"
              )}`}
            />
          </div>
          <div className="m-4 p-4 bg-gray-200">{jobInfo.content}</div>
          <div className="m-4">
            <SubTitle children={"Job Analysic"} />
            <div>duration: can use graph</div>
            <div>how many people apply</div>
            <div>how many people applied</div>
            <div>user rating maybe</div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PostDetailsPage;
