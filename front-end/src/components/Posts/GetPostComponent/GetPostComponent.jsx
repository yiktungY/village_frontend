import "./GetPostComponent.scss";
import { NavLink } from "react-router-dom";
function GetPostComponent(props) {
  return (
    <section className="postSection">
      {props.posts.map((post) => (
        <NavLink
          className="postSection__post"
          key={post.post_id}
          to={`/post/${post.post_id}`}
        >
          <div className="postSection__replace">
            <img
              className="postSection__picture"
              src={post.picture_Details}
              alt={`${post.title} picture`}
            />
          </div>
          <div className="postSection__details">
            <div className="postSection__details--title">{post.title}</div>

            <div className="postType"> {post.type}</div>
            <div className="postStatus"> {post.status}</div>
            <div className="postSection__details--user">
              By {post.displayName}
            </div>
          </div>
          <div className="postSection__details--time">{post.updated_at}</div>
        </NavLink>
      ))}
    </section>
  );
}

export default GetPostComponent;
