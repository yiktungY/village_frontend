import "./GetPostComponent.scss";
import { React, useState } from "react";
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
