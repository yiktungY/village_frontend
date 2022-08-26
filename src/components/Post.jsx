import { NavLink } from "react-router-dom";

import { timeDifferenceForDate } from "../utils/timeDifference";
const Post = ({ post_id, displayName, updated_at, title, type, status }) => {
  return (
    <section className="">
      <NavLink
        className="postSection__post"
        key={post_id}
        to={`/post/${post_id}`}
      >
        <div className="">{displayName}</div>
        <div className="">{timeDifferenceForDate(updated_at)}</div>

        <div className="">{title}</div>
        <div className="">
          <div className=""> {type}</div>
          <div className=""> {status}</div>
        </div>
      </NavLink>
    </section>
  );
};

export default Post;
