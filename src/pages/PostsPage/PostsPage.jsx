import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
import "./PostsPage.scss";
import "animate.css";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { EffectFlip, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ClipLoader from "react-spinners/ClipLoader";

const SERVER_URL = "http://localhost:8080";

function PostsPage() {
  const [posts, setPosts] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const fetchPosts = () => {
    axios
      .get(`${SERVER_URL}/posts`)
      .then((posts) => {
        setPosts(posts.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  useEffect(() => {
    document.title = "HOME";
    // fetchPosts();
  }, [posts]);

  return (
    <section className="postPage">
      <div className="postPage__text fontStyletwo">
        <h1 className="postPage__text--header">Welcome!</h1>
        <div className="animate__animated animate__flipInX postPage__text--subheaderTwo ">
          A new way to Contribute our Community.
        </div>
        <h1 className="postPage__text--subheader">This is VILLAGE</h1>
      </div>

      {loading ? (
        <div className="loading">
          <ClipLoader />
        </div>
      ) : (
        <div className="newPostSection">
          <h2 className="newPostSection__topic">Lastest Posts</h2>
          <Swiper
            effect={"flip"}
            grabCursor={true}
            pagination={true}
            navigation={true}
            modules={[EffectFlip, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <NavLink to={`/post/${posts[0].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[0].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <NavLink to={`/post/${posts[1].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[1].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <NavLink to={`/post/${posts[2].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[2].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <NavLink to={`/post/${posts[3].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[3].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <NavLink to={`/post/${posts[4].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[4].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <NavLink to={`/post/${posts[5].post_id}`}>
                <img
                  className="newPostSection__Picture"
                  src={posts[5].picture_Details}
                  alt=""
                />
              </NavLink>
            </SwiperSlide>
          </Swiper>
        </div>
      )}
      <div className="searchBar">
        <TextField
          className="searchBarColor"
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search Topic, Category, User... "
        />
      </div>
      <h2 className="newPostSection__topic">All Posts</h2>
      {loading ? (
        <div className="loading">
          <ClipLoader />
        </div>
      ) : (
        <GetPostComponent posts={posts} input={inputText} />
      )}
    </section>
  );
}

export default PostsPage;
