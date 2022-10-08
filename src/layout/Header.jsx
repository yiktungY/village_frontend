import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Notification, LoginButton } from "../components/Elements";
import { authAction } from "../store/login-slice";
import { BiAlignRight, BiStore } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedNumber = useSelector((state) => state.saveJob.totalQuantity);
  const notification = useSelector((state) => state.noticiation.context);
  const { userInfo, isLoggedIn } = useSelector((state) => state.login);
  const onLogOut = () => {
    dispatch(authAction.logout());
    navigate("");
  };
  return (
    <div
      className="flex flex-row border-b-2 border-stone-100 px-2 py-4 justify-between items-center
      "
    >
      {notification.length > 0 && <Notification message={notification} />}
      {isLoggedIn ? (
        <div className="flex flex-row">
          <img
            src={userInfo.avatar_url}
            alt={`icon of ${userInfo.displayName}`}
            className="h-8 w-8 object-cover rounded-full "
          />
          <button onClick={onLogOut}>logout</button>
        </div>
      ) : (
        <LoginButton />
      )}

      <Link to="/">
        <div className="text-3xl font-bold tracking-wide text-sky-500 hover:text-sky-600">
          Village
        </div>
      </Link>
      <div className="flex flex-row basis-1/6 justify-between md:justify-end">
        <Link to="/saveJobs" className="flex justify-start w-10">
          <BiStore className="text-2xl hover:text-sky-600 hover:drop-shadow-lg" />
          {savedNumber > 0 && (
            <div className="w-5 h-5 flex justify-center items-center relative bottom-2 right-3 bg-sky-500 rounded-full text-white text-xs drop-shadow-lg hover:animate-none animate-bounce ease-in-out duration-300">
              {savedNumber}
            </div>
          )}
        </Link>

        <BiAlignRight className="text-2xl hover:text-sky-600 hover:drop-shadow-lg cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
