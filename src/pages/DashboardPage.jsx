import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUpActions } from "../store/signUp-slice";
import { noticiationActions } from "../store/noticiation-slice";
import CountrySelect from "../components/Users/CountrySelect";
import AuthService from "../services/AuthService";
import { Button, Input, CirImage } from "../components/Elements";
import UploadPicture from "../components/Users/UploadPicture";
import axios from "axios";

const DashboradPage = () => {
  const signUp = useSelector((state) => state.signUp);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState({
    country: null,
    state: null,
    city: null,
  });
  const handleProgressBack = () => {
    setProgress((prev) => (prev -= 25));
  };
  const handleProgressNext = () => {
    setProgress((prev) => (prev += 25));
  };

  const handleSubmit = async () => {
    try {
      const address = [
        selectedOption.country?.name,
        selectedOption.state?.name,
        selectedOption.city?.name,
      ].join(",");

      const data = await AuthService.editUserInfo(user.userInfo.id, {
        address: address,
      });
      if (data?.status === 200) {
        dispatch(signUpActions.finishedBoarding());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateIconToApi = async (url) => {
    try {
      const link = await AuthService.editUserInfo(user.userInfo.id, {
        avatarUrl: url,
      });

      if (link) {
        dispatch(authAction.updateInfo({ icon: url }));
        dispatch(noticiationActions.showMessage("Your new icon looks great!"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (signUp.finishBorading) {
      navigate("/");
      dispatch(noticiationActions.showMessage("Finished boarding!"));
    }
  }, [signUp.finishBorading]);

  return (
    <div className="m-2 h-96 flex flex-col justify-between">
      <div>Welcome! {user.userInfo.displayName}</div>
      <div>Let us start the journey now! </div>
      {progress === 25 && (
        <div className="w-full flex flex-col items-center">
          <UploadPicture
            icon={user.userInfo.avatarUrl}
            action={handleUpdateIconToApi}
            image="Icon"
            username={user.userInfo.displayName}
          />
        </div>
      )}
      {progress === 50 && (
        <CountrySelect
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      )}
      {progress === 75 && <div>choosing your interested</div>}
      {progress === 100 && <div>show the progress</div>}

      <div className="w-full flex justify-between">
        {progress !== 0 && (
          <Button
            action="Go Back"
            handleAction={handleProgressBack}
            disable={true}
          />
        )}
        {progress === 100 ? (
          <Button action="Finish" handleAction={handleSubmit} disable={true} />
        ) : (
          <Button
            action={progress === 0 ? "Start" : "Next"}
            handleAction={handleProgressNext}
            disable={true}
          />
        )}
      </div>
      <div className="w-full bg-gray-200">
        <div
          className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default DashboradPage;
