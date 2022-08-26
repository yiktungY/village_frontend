import { NavLink } from "react-router-dom";
import { BiArchiveIn } from "react-icons/bi";

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
  return (
    <li className="border-b-2 p-2 my-4 list-none">
      <div className="flex flex-row justify-between">
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
          <BiArchiveIn className="text-3xl text-slate-400" />
        </div>
      </div>
      <div className="flex justify-end">
        {timeDifferenceForDate(updated_at)}
      </div>
    </li>
  );
};

export default Post;
