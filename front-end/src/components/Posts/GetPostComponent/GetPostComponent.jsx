import "./GetPostbyCategory.scss";
import { NavLink } from "react-router-dom";
function GetPostComponent(props) {
  return (
    <div>
      {props.posts.map((post) => (
        <NavLink
          className="post"
          key={post.post_id}
          to={`/post/${post.post_id}`}
        >
          <div>Name: {post.displayName}</div>
          <div>title: {post.title}</div>
          <div>content: {post.content}</div>
          <div>Category: {post.type}</div>
          <div>Status: {post.status}</div>
        </NavLink>
      ))}
    </div>
  );
}

export default GetPostComponent;
