import "./GetPostComponent.scss";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { NavLink } from "react-router-dom";
function GetPostComponent(props) {
  const filteredData = props.posts.filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return (
        el.title.toLowerCase().includes(props.input) ||
        el.type.toLowerCase().includes(props.input) ||
        el.status.toLowerCase().includes(props.input) ||
        el.displayName.toLowerCase().includes(props.input)
      );
    }
  });
  return (
    <section className="postSection">
      {filteredData.map((post) => (
        <NavLink
          className="postSection__post"
          key={post.post_id}
          to={`/post/${post.post_id}`}
        >
          {post.picture_Details ? (
            <div className="postSection__replace">
              <img
                className="postSection__picture"
                src={post.picture_Details}
                alt={`${post.title} picture`}
              />
            </div>
          ) : (
            <div className="postSection__noPicture">
              <HighlightOffTwoToneIcon sx={{ width: 100, height: 100 }} />
            </div>
          )}
          <div className="postSection__detailBox">
            <div className="postSection__details--user">
              By {post.displayName}
            </div>
            <div className="postSection__details--time">{post.updated_at}</div>
          </div>
          <div className="postSection__title">{post.title}</div>
          <div className="postSection__details">
            <div className="postType"> {post.type}</div>
            <div className="postStatus"> {post.status}</div>
          </div>
        </NavLink>
      ))}
    </section>
  );
}

export default GetPostComponent;
