import "./PostDetails.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
const SERVER_URL = "http://localhost:8080"



function PostDetails(props) {

  const [getPost, setgetPost] = useState({})

  const [userId, setUserId] = useState("")
  const postID = props.match.params.postID
  useEffect(() => {
    axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then(res => {
        if (res.data) {
          setUserId(res.data.id)
        }
      }).catch(err => console.log(err));
  }, [])

  const fetchPostById = () => {


    axios.get(`${SERVER_URL}/posts/${postID}`)
      .then(posts => {
        setgetPost(posts.data)
      })
      .catch(err => {
        console.log("Error fetching posts:", err);
      });
  }

  useEffect(() => {
    fetchPostById()
  }, [])

  const handlePostDelete = data => {
    axios.delete(
     `${SERVER_URL}/posts/${postID}`
    ).then((data) => {
     console.log(data)
          props.history.push(`/`);
      })
      .catch(err => console.log(err));  

}
  return (
    <section>
      <div>Name: {getPost.displayName}</div>
      <div>title: {getPost.title}</div>
      <div>content: {getPost.content}</div>
      {userId === getPost.user_id ? (
        <div>
        <NavLink to={`/postEdit/${getPost.id}`}>Edit Post</NavLink>
        <button onClick={handlePostDelete}>Delete Post</button>
        </div>
      )
      
      :
      <div>This is applied button</div>
      }
    </section>


  )
};


export default PostDetails;


  //       //   <article className="post">
    //       //   <h2 className="post__title">{post.title}</h2>
    //       //   <div className="post__details">
    //       //     <div className="post__author">
    //       //       <img
    //       //         className="post__avatar"
    //       //         src={post.avatar_url}
    //       //         alt={`${post.username} avatar`}
    //       //       />
    //       //       <h3 className="post__username">{post.username}</h3>
    //       //       {
    //       //         // Show a "Your Post" label for posts that have been created by currently logged in user
    //       //         post.isCurrentUser &&
    //       //         <div className="post__owned">🔥&nbsp;&nbsp;Your Post</div>
    //       //       }
    //       //     </div>
    //       //     <p className="post__published">{formatTimestamp(post.updated_at)}</p>
    //       //   </div>
    //       //   <p className="post__content">{post.content}</p>
    //       // </article>