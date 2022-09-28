import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CountrySelect from "../components/Users/CountrySelect";
import IconUpdate from "../components/Users/IconUpdate";
import { Button, Input } from "../components/Elements";
import UploadPicture from "../components/Users/UploadPicture";

const DashboradPage = () => {
  const userInfo = useSelector((state) => state.signUp.userInfo);
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
    console.log(selectedOption);
  };
  console.log(userInfo);
  return (
    <div className="m-2 h-96 flex flex-col justify-between">
      <div>Welcome! {userInfo.displayName}</div>
      <div>Let us start the journey now! </div>
      {progess === 25 && (
        <>
          <IconUpdate
            icon={userInfo.avatar_url}
            username={userInfo.displayName}
            action={handleSubmit}
          />
          <UploadPicture  icon={userInfo.avatar_url} />
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
