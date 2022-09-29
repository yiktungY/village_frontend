import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUpActions } from "../store/signUp-slice";
import { noticiationActions } from "../store/noticiation-slice";
import CountrySelect from "../components/Users/CountrySelect";
import IconUpdate from "../components/Users/IconUpdate";
import { Button, Input } from "../components/Elements";
import UploadPicture from "../components/Users/UploadPicture";

const DashboradPage = () => {
  const signUp = useSelector((state) => state.signUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progess, setProgess] = useState(0);
  const [selectedOption, setSelectedOption] = useState({
    country: null,
    state: null,
    city: null,
  });

  const handleProgessBack = () => {
    setProgess((prev) => (prev -= 25));
  };
  const handleProgessNext = () => {
    setProgess((prev) => (prev += 25));
  };

  const handleSubmit = () => {
    dispatch(signUpActions.finishedBoarding());
  };

  useEffect(() => {
    if (signUp.finishBorading) {
      navigate("/");
      dispatch(noticiationActions.showMessage("Finished boarding!"));
      setTimeout(() => {
        dispatch(noticiationActions.hideMessage());
      }, 3000);
    }
  }, [signUp.finishBorading]);

  return (
    <div className="m-2 h-96 flex flex-col justify-between">
      <div>Welcome! {signUp.userInfo.displayName}</div>
      <div>Let us start the journey now! </div>
      {progess === 25 && (
        <>
          <IconUpdate
            icon={signUp.userInfo.avatar_url}
            username={signUp.userInfo.displayName}
            action={handleSubmit}
          />
          <UploadPicture icon={signUp.userInfo.avatar_url} />
        </>
      )}
      {progess === 50 && (
        <>
          <CountrySelect
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
          <div>Optional</div>
          <Input
            type="age"
            id="age"
            label="Your age"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error="error"
            // handleOnChange={(e) =>
            //   handleChange(e, "password", isValidPassword(e.target.value))
            // }
            // handleOnBlur={(e) =>
            //   handleError("password", isValidPassword(e.target.value))
            // }
          />
          <Input
            type="age"
            id="age"
            label="Your age"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error="error"
            // handleOnChange={(e) =>
            //   handleChange(e, "password", isValidPassword(e.target.value))
            // }
            // handleOnBlur={(e) =>
            //   handleError("password", isValidPassword(e.target.value))
            // }
          />
          <Input
            type="age"
            id="age"
            label="Your age"
            // icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
            error="error"
            // handleOnChange={(e) =>
            //   handleChange(e, "password", isValidPassword(e.target.value))
            // }
            // handleOnBlur={(e) =>
            //   handleError("password", isValidPassword(e.target.value))
            // }
          />
        </>
      )}
      {progess === 75 && <div>choosing your interested</div>}
      {progess === 100 && <div>show the progess</div>}

      <div className="w-full flex justify-between">
        {progess !== 0 && (
          <Button
            action="Go Back"
            handleAction={handleProgessBack}
            disable={true}
          />
        )}
        {progess === 100 ? (
          <Button action="Finish" handleAction={handleSubmit} disable={true} />
        ) : (
          <Button
            action={progess === 0 ? "Start" : "Next"}
            handleAction={handleProgessNext}
            disable={true}
          />
        )}
      </div>
      <div className="w-full bg-gray-200">
        <div
          className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
          style={{ width: `${progess}%` }}
        >
          {progess}%
        </div>
      </div>
    </div>
  );
};

export default DashboradPage;
