import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { popUpActions } from "../store/popUp-slice";
import { noticiationActions } from "../store/noticiation-slice";
import { Button, SubTitle, BasicInput } from "./Elements";
import JobService from "../services/JobService";

const ApplyJobForm = () => {
  const dispatch = useDispatch();
  const [applyInfo, setApplyInfo] = useState({ content: "", offer: "" });
  const { login, jobDetails } = useSelector((state) => state);
  const { userInfo, isLoggedIn } = login;
  console.log(jobDetails);
  const handleApplySubmit = async () => {
    const info = {
      ...applyInfo,
      userId: userInfo.id,
      postId: jobDetails.jobID,
    };
    console.log(info);
    const data = await JobService.applyJob(info, jobDetails.jobID);
    if (data?.status === 201) {
      dispatch(popUpActions.showPopUp("showJobApply"));
      dispatch(noticiationActions.showMessage(data.data.message));
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="m-4">
          <SubTitle>leave a message to {userInfo.displayName}</SubTitle>
          <BasicInput
            placeholder="Introduction and explain why"
            handleOnChange={(e) =>
              setApplyInfo((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <SubTitle>What would you like to receive? </SubTitle>
          <BasicInput
            placeholder="something like: 10 bucks per hour"
            handleOnChange={(e) =>
              setApplyInfo((prev) => ({ ...prev, offer: e.target.value }))
            }
          />

          <div className="flex flex-row justify-between w-full">
            <div
              onClick={() => dispatch(popUpActions.showPopUp("showJobApply"))}
            >
              <Button disable={true} action="cancel" />
            </div>
            <Button
              disable={true}
              action={"Apply"}
              handleAction={handleApplySubmit}
            />
          </div>
          <SubTitle>
            Please apply carefully. Once you applied the job, you are not able
            the edit / delete it.
          </SubTitle>
        </div>
      ) : (
        <div>
          <h2 className="">OPPS! You haven't logged in yet...</h2>
        </div>
      )}
    </>
  );
};

export default ApplyJobForm;
