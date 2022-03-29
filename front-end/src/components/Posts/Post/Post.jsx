import "./Post.scss"

function Post(props) {
    // const formatTimestamp = timestamp => {
    //     return (new Date(timestamp)).toLocaleString("en-US")
    // }

    
    return (
      <div className="post">
      <div>title: {props.post.title}</div>
      <div>content: {props.post.content}</div>
      </div>



      //   <article className="post">
      //   <h2 className="post__title">{post.title}</h2>
      //   <div className="post__details">
      //     <div className="post__author">
      //       <img
      //         className="post__avatar"
      //         src={post.avatar_url}
      //         alt={`${post.username} avatar`}
      //       />
      //       <h3 className="post__username">{post.username}</h3>
      //       {
      //         // Show a "Your Post" label for posts that have been created by currently logged in user
      //         post.isCurrentUser &&
      //         <div className="post__owned">🔥&nbsp;&nbsp;Your Post</div>
      //       }
      //     </div>
      //     <p className="post__published">{formatTimestamp(post.updated_at)}</p>
      //   </div>
      //   <p className="post__content">{post.content}</p>
      // </article>
    );
  };
    

export default Post;